Get-ChildItem -Directory | ForEach-Object {
    $size = 0
    Get-ChildItem -File -Recurse -Path $_.FullName | ForEach-Object {
        $size += $_.Length
    }
    [PSCustomObject]@{
        Name = $_.Name
        Size = $size
    }
} | Sort-Object -Property Size -Descending | Select-Object -First 10 | ForEach-Object {
    $sizeReadable = If ($_.Size -gt 1MB) { "{0:N2} MB" -f ($_.Size / 1MB) } ElseIf ($_.Size -gt 1KB) { "{0:N2} KB" -f ($_.Size / 1KB) } Else { "{0} bytes" -f $_.Size }
    [PSCustomObject]@{
        Name = $_.Name
        Size = $sizeReadable
    }
} | Format-Table -AutoSize
