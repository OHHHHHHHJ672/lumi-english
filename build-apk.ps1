param([string]$AndroidSdk = $env:ANDROID_SDK_ROOT, [string]$JavaDir = $env:JAVA_HOME)
$ErrorActionPreference = 'Stop'
if (!$AndroidSdk -or !$JavaDir) { throw 'Pass -AndroidSdk and -JavaDir, or set ANDROID_SDK_ROOT and JAVA_HOME.' }
$project = $PSScriptRoot
$build = Join-Path $project 'build'
$bt = Join-Path $AndroidSdk 'build-tools\35.0.0'
$androidJar = Join-Path $AndroidSdk 'platforms\android-35\android.jar'
function Check-Exit { if ($LASTEXITCODE -ne 0) { throw "Build tool failed with code $LASTEXITCODE" } }
foreach ($part in @('resources','classes','dex','generated','signing')) { New-Item -ItemType Directory -Force -Path (Join-Path $build $part) | Out-Null }
$manifest = Get-Content -Raw (Join-Path $project 'app\src\main\AndroidManifest.xml')
$manifest = $manifest.Replace('<manifest xmlns:android=', '<manifest package="com.lumilearn.english" xmlns:android=')
# Windows PowerShell 5.1 does not support -Encoding utf8NoBOM, so write the
# generated manifest through .NET to keep the aapt2 input free of a BOM.
[System.IO.File]::WriteAllText((Join-Path $build 'AndroidManifest.xml'), $manifest, (New-Object System.Text.UTF8Encoding($false)))
& "$bt\aapt2.exe" compile --dir "$project\app\src\main\res" -o "$build\resources"
Check-Exit
$resources = Get-ChildItem "$build\resources" -Filter '*.flat' | ForEach-Object { $_.FullName }
& "$bt\aapt2.exe" link -o "$build\unsigned.apk" -I $androidJar --manifest "$build\AndroidManifest.xml" -A "$project\app\src\main\assets" --min-sdk-version 26 --target-sdk-version 35 --version-code 2 --version-name '1.1.0' --java "$build\generated" $resources
Check-Exit
$javaSources = Get-ChildItem "$project\app\src\main\java" -Filter '*.java' -Recurse | ForEach-Object { $_.FullName }
$generatedSources = Get-ChildItem "$build\generated" -Filter '*.java' -Recurse | ForEach-Object { $_.FullName }
& "$JavaDir\bin\javac.exe" -encoding UTF-8 -source 8 -target 8 -classpath $androidJar -d "$build\classes" ($javaSources + $generatedSources)
Check-Exit
& "$JavaDir\bin\jar.exe" cf "$build\classes.jar" -C "$build\classes" .
Check-Exit
$env:JAVA_HOME = $JavaDir
& "$bt\d8.bat" --lib $androidJar --min-api 26 --output "$build\dex" "$build\classes.jar"
Check-Exit
& "$JavaDir\bin\jar.exe" uf "$build\unsigned.apk" -C "$build\dex" classes.dex
Check-Exit
& "$bt\zipalign.exe" -f -p 4 "$build\unsigned.apk" "$build\aligned.apk"
Check-Exit
$secretFile = "$project\signing\password.txt"
$keyFile = "$project\signing\lumi-release.jks"
if (!(Test-Path $keyFile)) {
    New-Item -ItemType Directory -Force -Path "$project\signing" | Out-Null
    $bytes = New-Object byte[] 32
    [System.Security.Cryptography.RandomNumberGenerator]::Fill($bytes)
    $secret = [Convert]::ToBase64String($bytes)
    Set-Content -LiteralPath $secretFile -Value $secret -Encoding ascii -NoNewline
    & "$JavaDir\bin\keytool.exe" -genkeypair -keystore $keyFile -storepass:file $secretFile -keypass:file $secretFile -alias lumi -keyalg RSA -keysize 2048 -validity 10000 -dname 'CN=Lumi English, O=Independent Learning, C=CN' -storetype JKS 2> "$build\key-generation.log"
    Check-Exit
}
& "$bt\apksigner.bat" sign --ks $keyFile --ks-key-alias lumi --ks-pass "file:$secretFile" --out "$build\Lumi-English-1.1.apk" "$build\aligned.apk"
Check-Exit
& "$bt\apksigner.bat" verify --verbose "$build\Lumi-English-1.1.apk"
Check-Exit
Write-Output "APK: $build\Lumi-English-1.1.apk"

