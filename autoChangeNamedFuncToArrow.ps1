Get-ChildItem -File *.vue, *.ts, *.js -Recurse | ForEach-Object {
  $filePath = $_.FullName
  $str = (Get-Content -Path $filePath -Raw)
  $res = [regex]::matches($str, 
    "(\s*)(async)?(\s*)function\s+(\w+)" +
    "(" +
    "\s*[^\(\)]*\s*" +
    "(" +
    "(" +
    "(?'Open1'\()" +
    "[^\(\)]*\s*" +
    ")*" +
    "(" +
    "(?'Close1-Open1'\))" +
    ")*" +
    ")*" +
    "\s*:?\s*[^{}]*\s*" +
    "(" +
    "(" +
    "(?'Open2'{)" +
    "[^{}]*\s*" +
    ")*" +
    "(" +
    "(?'Close2-Open2'})" +
    ")*" +
    ")*" +
    ")" +
    "\s*{" +
    "(?(Open1)(?!))" +
    "(?(Open2)(?!))"
  )
  if ($res -ne '') {
    "optimized $filePath"
    $str -creplace "(\s*)(async)?(\s*)function\s+(\w+)(\s*[^\(\)]*\s*(((?'Open1'\()[^\(\)]*\s*)*((?'Close1-Open1'\)))*)*\s*:?\s*[^{}]*\s*(((?'Open2'{)[^{}]*\s*)*((?'Close2-Open2'}))*)*)\s*{(?(Open1)(?!))(?(Open2)(?!))", '$1$3const $4 = $2 $5 => {' | Set-Content -Path $filePath
  }
}
Write-Host "Please press any key to continute..."
$null = [System.Console]::ReadKey()
break
