param(
  [string]$Project = "C:\Users\Administrator\Desktop\lumi-english-beta",
  [string]$Output = "C:\Users\Administrator\Desktop\lumi-english-beta-source-lite-2026-10-08.zip"
)
$ErrorActionPreference = 'Stop'
if (Test-Path -LiteralPath $Output) { Remove-Item -LiteralPath $Output -Force }
$files = Get-ChildItem -LiteralPath $Project -Recurse -File | Where-Object {
  $_.FullName -notmatch '\\.git\\|\\build\\|\\signing\\|\\node_modules\\|\\audio\\|lumi-english-beta-source-.*\.zip$|authored-blocks\.json$|tts-manifest\.(js|json)$'
}
$temp = Join-Path ([IO.Path]::GetTempPath()) ('lumi-source-lite-' + [guid]::NewGuid().ToString('N'))
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
