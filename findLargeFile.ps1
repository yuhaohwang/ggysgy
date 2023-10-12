$files = Get-ChildItem -File -Recurse | Sort-Object -Property Length -Descending | Select-Object -First 50

foreach ($file in $files) {
    $size = $file.Length
    $sizeReadable = If ($size -gt 1MB) { "{0:N2} MB" -f ($size / 1MB) } Else { "{0:N2} KB" -f ($size / 1KB) }
    Write-Host ("File: {0}, Size: {1}" -f $file.FullName, $sizeReadable)
}
