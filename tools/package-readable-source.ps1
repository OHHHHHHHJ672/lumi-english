param(
  [string]$Project = "C:\Users\Administrator\Desktop\lumi-english-beta",
  [string]$Output = "C:\Users\Administrator\Desktop\lumi-english-readable-source-2026-10-08.zip"
)
$ErrorActionPreference = 'Stop'
if (Test-Path -LiteralPath $Output) { Remove-Item -LiteralPath $Output -Force }
$allowed = @('.js','.json','.html','.css','.java','.md','.ps1','.gradle','.properties','.xml','.pro','.txt','.gitignore')
$files = Get-ChildItem -LiteralPath $Project -Recurse -File | Where-Object {
  $relative = $_.FullName.Substring($Project.Length)
  $allowed -contains $_.Extension.ToLowerInvariant() -and
  $relative -notmatch '\\.git\\|\\build\\|\\signing\\|\\node_modules\\|\\audio\\|\\.apk$|\\.idsig$|authored-course\.js$|authored-blocks\.json$'
}
$temp = Join-Path ([IO.Path]::GetTempPath()) ('lumi-readable-' + [guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory -Path $temp | Out-Null
try {
  foreach ($file in $files) {
    $relative = $file.FullName.Substring($Project.Length).TrimStart('\')
    $target = Join-Path $temp $relative
    New-Item -ItemType Directory -Force -Path (Split-Path $target -Parent) | Out-Null
    Copy-Item -LiteralPath $file.FullName -Destination $target
  }
  Compress-Archive -Path (Join-Path $temp '*') -DestinationPath $Output -CompressionLevel Optimal
} finally {
  Remove-Item -LiteralPath $temp -Recurse -Force -ErrorAction SilentlyContinue
}
$zip = Get-Item -LiteralPath $Output
[pscustomobject]@{ Path = $zip.FullName; SizeMB = [math]::Round($zip.Length / 1MB, 2); Files = $files.Count; Modified = $zip.LastWriteTime }
