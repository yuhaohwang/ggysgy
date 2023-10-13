# 直接return对象的箭头函数
$flag1 = "False"
do {
  $flag2 = "False"
  Get-ChildItem -File -Recurse -include *.ts, *.js, *.vue | ForEach-Object {
    $filePath = $_.FullName
    $filePath
    $str = (Get-Content -Path $filePath -Raw)
    $res = [regex]::matches($str, 
      "(?'start'.*=>)" +
      "\s*{" +
      "(?'comment'\s*//.*)?" +
      "\s*return\b" +
      "\s*" +
      "(?'object'" +
      "(" +
      "((?'Open2'{)[^{}]*)*" +
      "((?'Close2-Open2'})[^{}]*)*" +
      ")*?" +
      ")" +
      "\s*;" +
      "\s*}\s*" +
      "(?'end',|;)?" +
      "(?(Open2)(?!))"
    )        
    if ($res -ne '') {
      $flag2 = "True"
      "optimized $filePath"
      $res.Value
      $str -creplace `
        "(?'start'.*=>)\s*{(?'comment'\s*//.*)?\s*return\b\s*(?'object'(((?'Open2'{)[^{}]*)*((?'Close2-Open2'})[^{}]*)*)*?)\s*;\s*}\s*(?'end',|;)?(?(Open2)(?!))", `
        "`${comment}`n`${start} (`${object})`${end}"`
      | Set-Content -Path $filePath
    }
  }
  $flag1 = $flag2
} while ($flag1 -eq "True")

# 直接return数组的箭头函数
$flag1 = "False"
do {
  $flag2 = "False"
  Get-ChildItem -File -Recurse -include *.ts, *.js, *.vue | ForEach-Object {
    $filePath = $_.FullName
    $filePath
    $str = (Get-Content -Path $filePath -Raw)
    $res = [regex]::matches($str, 
      "(?'start'.*=>)" +
      "\s*{" +
      "(?'comment'\s*//.*)?" +
      "\s*return\b" +
      "\s*" +
      "(?'array'" +
      "((?'Open'\[)[^\[\]]*)+" +
      "(?'Close-Open'\])+" +
      ")" +
      "\s*;" +
      "\s*}\s*" +
      "(?'end',|;)?" +
      "(?(Open)(?!))"
    )        
    if ($res -ne '') {
      $flag2 = "True"
      "optimized $filePath"
      $res.Value
      $str -creplace `
        "(?'start'.*=>)\s*{(?'comment'\s*//.*)?\s*return\b\s*(?'array'((?'Open'\[)[^\[\]]*)+(?'Close-Open'\])+)\s*;\s*}\s*(?'end',|;)?(?(Open)(?!))", `
        "`${comment}`n`${start} `${array}`${end}"`
      | Set-Content -Path $filePath
    }
  }
  $flag1 = $flag2
} while ($flag1 -eq "True")

# 直接return或者只有一个方法的箭头函数
$flag1 = "False"
do {
  $flag2 = "False"
  Get-ChildItem -File -Recurse -include *.ts, *.js, *.vue | ForEach-Object {
    $filePath = $_.FullName
    $filePath
    $str = (Get-Content -Path $filePath -Raw)
    $res = [regex]::matches($str, 
      "(?'start'.*=>)" +
      "\s*{" +
      "(?'comment'\s*//.*)?" +
      "(\s*return\b)?" +
      "(?'method'" +
      "(\s*await\b)?" +
      "\s*" +
      "(?'name'(?!(if|switch|for|while|try|new|const|let|var))\w*)" +
      "\s*" +
      "(" +
      "((?'Open1'\()[^\(\)]*)*" +
      "((?'Close1-Open1'\))[^\(\){};]*)*" +
      ")*" +
      "(" +
      "((?'Open2'{)[^{}]*)*" +
      "((?'Close2-Open2'})[^{};]*)*" +
      ")*" +
      ")" +
      "\s*;" +
      "\s*}\s*" +
      "(?'end',|;)?" +
      "(?(Open1)(?!))" +
      "(?(Open2)(?!))"
    )     
    if ($res -ne '') {
      $flag2 = "True"
      "optimized $filePath"
      $res.Value
      $str -creplace `
        "(?'start'.*=>)\s*{(?'comment'\s*//.*)?(\s*return\b)?(?'method'(\s*await\b)?\s*(?'name'(?!(if|switch|for|while|try|new|const|let|var))\w*)\s*(((?'Open1'\()[^\(\)]*)*((?'Close1-Open1'\))[^\(\){};]*)*)*(((?'Open2'{)[^{}]*)*((?'Close2-Open2'})[^{};]*)*)*)\s*;\s*}\s*(?'end',|;)?(?(Open1)(?!))(?(Open2)(?!))", `
        "`${comment}`n`${start} `${method}`${end}"`
      | Set-Content -Path $filePath
    }
  }
  $flag1 = $flag2
} while ($flag1 -eq "True")

# 去掉(if|else|else if)下只有一个方法
$flag1 = "False"
do {
  $flag2 = "False"
  Get-ChildItem -File -Recurse -include *.ts, *.js, *.vue | ForEach-Object {
    $filePath = $_.FullName
    $filePath
    $str = (Get-Content -Path $filePath -Raw)
    $res = [regex]::matches($str, 
      "(?'start'(?=\s*(if|else|else\s+if)\b).*)" +
      "\s*{" +
      "(?'comment'\s*//.*)?" +
      "\s*" + 
      "(?'return'return\b)?" +
      "(?'method'" +
      "(\s*await\b)?" +
      "\s*" +
      "(?'name'(?!(if|switch|for|while|try|new|const|let|var))\w*)" +
      "\s*" +
      "(" +
      "((?'Open1'\()[^\(\)]*)*" +
      "((?'Close1-Open1'\))[^\(\){};]*)*" +
      ")*" +
      "(" +
      "((?'Open2'{)[^{}]*)*" +
      "((?'Close2-Open2'})[^{};]*)*" +
      ")*?" +
      ")" +
      "\s*" +
      "(?'end';)" +
      "\s*}" +
      "(?(Open1)(?!))" +
      "(?(Open2)(?!))"
    )
    if ($res -ne '') {
      $flag2 = "True"
      "optimized $filePath"
      $res.Value
      $str -creplace `
        "(?'start'(?=\s*(if|else|else\s+if)\b).*)\s*{(?'comment'\s*//.*)?\s*(?'return'return\b)?(?'method'(\s*await\b)?\s*(?'name'(?!(if|switch|for|while|try|new|const|let|var))\w*)\s*(((?'Open1'\()[^\(\)]*)*((?'Close1-Open1'\))[^\(\){};]*)*)*(((?'Open2'{)[^{}]*)*((?'Close2-Open2'})[^{};]*)*)*)\s*(?'end';)\s*}(?(Open1)(?!))(?(Open2)(?!))", `
        "`${comment}`n`${start} `${return}` `${method}`${end}"`
      | Set-Content -Path $filePath
    }
  }
  $flag1 = $flag2
} while ($flag1 -eq "True")

Write-Host "Please press any key to continute..."
$null = [System.Console]::ReadKey()
break