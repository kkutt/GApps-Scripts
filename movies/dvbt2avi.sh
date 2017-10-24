#!/bin/bash

### Convert the files generated by DVBT decoder to one avi file
### NOTE: this is not a regular script - it is a set of commands, that have to be modified accordingly to the comments and executed one by one

# join all generated parts into one:

cat movie.mts movie.mts2 movie.mts3 > result.mts

# convert to xvid/avi, adjust the quality by bitrate: -b 2500k; provide proper dimensions for -s 720x576:

ffmpeg -i result.mts -vcodec libxvid -b 2500k -acodec libmp3lame -ac 2 -ab 256k -deinterlace -s 720x576 result.avi

# trim the file length if it is needed (ss - start time; t - length):

ffmpeg -i wynik.avi -ss 00:06:09.0 -c copy -t 00:28:44.0 result2.avi
