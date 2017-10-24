#!/bin/bash
# Place signature on A4 PDF

#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU General Public License as published by
#    the Free Software Foundation, either version 3 of the License, or
#    (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU General Public License for more details.
#
#    You should have received a copy of the GNU General Public License
#    along with this program.  If not, see <http://www.gnu.org/licenses/>.

# Author:           szapp
# Original file:    https://github.com/szapp/pdfUtils/blob/master/signpdf.sh
# My modifications: signature renamed, evince commented

if ! [ $3 ]; then
    echo "Usage: ${0##*/} document coord-x coord-y [scale]"
    echo "Coordinates from center"
    exit 1
fi

coords=$2'cm '$3'cm'
datetime=$(date +"%Y-%m-%d_%H%M")
signature='tmp_'$datetime'_sign'
signaturepdf=$signature'.pdf'
signaturepdfjam=$signature'-pdfjam.pdf'
output=${1%.*}'_signed.pdf'
scale=$4
if ! [ $4 ]; then
	scale=0.2
fi

convert signature.png $signaturepdf
pdfjam --paper 'a4paper' --scale $scale --offset "$coords" $signaturepdf
pdftk "$1" stamp $signaturepdfjam output "$output"

# Clean up temp files
rm $signaturepdf
rm $signaturepdfjam

# Open sigened document
# evince "$output"

