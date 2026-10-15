# Rivers image download + derivative build script
# Run: powershell -File d:\User(D)\Coding\Axom\scripts\river-assets.ps1
$ErrorActionPreference = 'Stop'
$srcDir = 'd:\User(D)\Coding\Axom\public\images\rivers\originals'
$proxyOk = $true

function Get-Web ($url, $out) {
  if (Test-Path $out) { Remove-Item $out }
  Invoke-WebRequest -Uri $url -OutFile $out -UseBasicParsing
  return (Get-Item $out).Length
}

$files = @(
  @{ Name = 'brahmaputra-guwahati.jpg'; Url = 'https://commons.wikimedia.org/wiki/Special:FilePath/Brahmaputra_River_Guwahati_Assam.jpg?width=6000' },
  @{ Name = 'barak-silchar.jpg';     Url = 'https://commons.wikimedia.org/wiki/Special:FilePath/Barak_River_as_seen_from_Sadarghat_Bridge,_Silchar,_Assam..JPG?width=6000' },
  @{ Name = 'subansiri-lakhimpur.jpg'; Url = 'https://commons.wikimedia.org/wiki/Special:FilePath/Subansiri_river_in_Lakhimpur,_Assam1.jpg?width=6000' },
  @{ Name = 'jia-bharali-nameri.jpg'; Url = 'https://commons.wikimedia.org/wiki/Special:FilePath/Nameri_2.JPG?width=6000' },
  @{ Name = 'dikhow-sivasagar.jpg';  Url = 'https://commons.wikimedia.org/wiki/Special:FilePath/Dikhow_river.jpg?width=6000' },
  @{ Name = 'kopili-river.jpg';      Url = 'https://commons.wikimedia.org/wiki/Special:FilePath/Kopili_River.jpg?width=6000' },
  @{ Name = 'kulsi-chandubi.jpg';    Url = 'https://commons.wikimedia.org/wiki/Special:FilePath/Kulsi_River.jpg?width=6000' },
  @{ Name = 'dhansiri-bhairabkunda.jpg'; Url = 'https://commons.wikimedia.org/wiki/Special:FilePath/Bhairabkunda.jpg?width=6000' },
  @{ Name = 'beki-river.jpg';        Url = 'https://commons.wikimedia.org/wiki/Special:FilePath/River_if_beki_IMG_20190805_180937.jpg?width=6000' },
  @{ Name = 'burhi-dihing-dibrugarh.jpg'; Url = 'https://commons.wikimedia.org/wiki/Special:FilePath/Burhi_Dihing_River.jpg?width=6000' },
  @{ Name = 'longai-karimganj.jpg';  Url = 'https://commons.wikimedia.org/wiki/Special:FilePath/Longai_River.jpg?width=6000' },
  @{ Name = 'manas-river.jpg';        Url = 'https://commons.wikimedia.org/wiki/Special:FilePath/River_landscape_IMG_20210306_100925.jpg?width=4000' }
)

Write-Host "Downloading originals to $srcDir"
foreach ($f in $files) {
  $path = Join-Path $srcDir $f.Name
  try {
    $sz = Get-Web $f.Url $path
    Write-Host ("OK  {0}  ({1} bytes)" -f $f.Name, $sz)
  } catch {
    Write-Host ("FAIL {0} -> {1}" -f $f.Name, $_.Exception.Message)
  }
}

Write-Host "DONE"
