#!/bin/bash
# ─────────────────────────────────────────────────────
# Mel Shields Portfolio — Image Downloader
# Run this once from the Portfolio Project folder:
#   bash download-images.sh
# ─────────────────────────────────────────────────────

BASE="https://uploads-ssl.webflow.com/6383d5125f097f49536395f6"
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"

# Create folders
mkdir -p images/cabin images/sleepme images/skiptown images/passport

echo "📥 Downloading Cabin.City images..."
curl -sSL -A "$UA" "$BASE/647d2a61940fa0b97ffecc93_cab%201.png"    -o images/cabin/img-1.png
curl -sSL -A "$UA" "$BASE/647d2a61b0177009b5b66db2_cab%202.png"    -o images/cabin/img-2.png
curl -sSL -A "$UA" "$BASE/647d2a61f9ea7c86b994b1bd_cab%203.png"    -o images/cabin/img-3.png
curl -sSL -A "$UA" "$BASE/647d2a615799143b7ed090fd_cab%204.png"    -o images/cabin/img-4.png
curl -sSL -A "$UA" "$BASE/647d2a6110c854b3bb5d4de6_cab%205.png"    -o images/cabin/img-5.png
curl -sSL -A "$UA" "$BASE/647d2a615799143b7ed090ec_cab%206.png"    -o images/cabin/img-6.png
curl -sSL -A "$UA" "$BASE/647d2a62b0177009b5b66dd1_cab%207.png"    -o images/cabin/img-7.png

echo "📥 Downloading Sleepme images..."
curl -sSL -A "$UA" "$BASE/63855d9f5d215da438e8ad71_Cover_sleepme.png"         -o images/sleepme/cover.png
curl -sSL -A "$UA" "$BASE/638804a3b92f237f1c3eee1d_sleepme_dark.gif"          -o images/sleepme/dark.gif
curl -sSL -A "$UA" "$BASE/638560b613d75fbe6237f1b3_sleepme_asset_1.png"       -o images/sleepme/asset-1.png
curl -sSL -A "$UA" "$BASE/638560b627406290c4340ff2_sleepme_asset_2.png"       -o images/sleepme/asset-2.png
curl -sSL -A "$UA" "$BASE/638560b6819140af3f2f419d_sleepme_asset_3.png"       -o images/sleepme/asset-3.png

echo "📥 Downloading Skiptown images..."
curl -sSL -A "$UA" "$BASE/638d6b3b95fb430478511818_EC10393B-29E1-4A6A-AB6D-B461AAE0BEAA.webp" -o images/skiptown/hero.webp
curl -sSL -A "$UA" "$BASE/638d6b8281587683f4f09a9c_7984436D-D4E1-43A6-93B1-8A7D5663C68E.webp" -o images/skiptown/img-2.webp
curl -sSL -A "$UA" "$BASE/638d6b8895fb432e5b511f27_90962DDD-DC1C-4DBD-BD91-9444B40C6C8F.webp" -o images/skiptown/img-3.webp
curl -sSL -A "$UA" "$BASE/638d6d00bea1f6e7e3105f32_skiptown%20web.png"                        -o images/skiptown/web.png
curl -sSL -A "$UA" "$BASE/638d6b942e5f7846996fc15f_E2408BBA-FA78-4C18-B073-1FC49775E338.webp" -o images/skiptown/img-5.webp
curl -sSL -A "$UA" "$BASE/638d6b941f96ab19166bdaf5_B8ED1E69-B88B-40C9-B5BD-268B106217CE.webp" -o images/skiptown/img-6.webp

echo "📥 Downloading Passport images..."
curl -sSL -A "$UA" "$BASE/638d6f5a7903a68e3ca48f0f_27169A02-5A96-4176-816E-021B1EFE7F58.webp" -o images/passport/hero.webp
curl -sSL -A "$UA" "$BASE/638d6f6995fb43b529516355_A10667D7-00B3-4843-95D3-8E9B664B93F3.webp" -o images/passport/img-2.webp
curl -sSL -A "$UA" "$BASE/638d6f6d0e9946d65e21b1de_3292A817-DD72-4F31-856F-971D2AB7B51F.webp" -o images/passport/img-3.webp
curl -sSL -A "$UA" "$BASE/638d6f729bf138d1fff1b668_1991C5ED-011A-4F0E-ACCB-3F19B526B38D.webp" -o images/passport/img-4.webp
curl -sSL -A "$UA" "$BASE/638d6f78de35903fac72550c_59EBE6D1-A029-43B1-AF9E-FB4F8E8A0693.webp" -o images/passport/img-5.webp
curl -sSL -A "$UA" "$BASE/638d6f7810a6ce29d86e8efc_77BA1C24-8D86-496E-B0DA-223E8BD8E75F.webp"  -o images/passport/img-6.webp
curl -sSL -A "$UA" "$BASE/638d6f785fd2fd0997b4534a_9AC58610-2343-42DA-A119-E08593422626.webp"  -o images/passport/img-7.webp

echo ""
echo "✅ Done! Checking downloaded files..."
echo ""
echo "Cabin:    $(ls images/cabin | wc -l | tr -d ' ') files"
echo "Sleepme:  $(ls images/sleepme | wc -l | tr -d ' ') files"
echo "Skiptown: $(ls images/skiptown | wc -l | tr -d ' ') files"
echo "Passport: $(ls images/passport | wc -l | tr -d ' ') files"
