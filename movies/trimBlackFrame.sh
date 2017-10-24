#!/bin/bash

### Trim black frame around the video file
### NOTE: this is not a regular script - it is a set of commands, that have to be modified accordingly to the comments and executed one by one

# check trimming values
# start from time 00:10:00 (ss 600) and check 10 subsequent frames (-vframes 10)

ffmpeg -ss 600 -i input.avi -vframes 10 -vf cropdetect -f null -

# in the result you will see ''crop=624:272:12:102''
# copy this and check whether these values are proper:

ffplay -vf crop=624:272:12:102 input.avi

# if too much or too less is trimmed, you can adjust the values manually; they are in the format: w:h:x:y, where
#  w - width of final video
#  h - height of final video
#  x,y - position of top left point of final video

# if everything is OK, trim and convert using xvid (quality may be changed by manipulation of 1400k - you can enter any other bitrate value):

ffmpeg -i input.avi -vf crop=624:272:12:102 -vcodec libxvid -b:v 1400k -c:a copy output.avi

# you can also convert to mp4 (quality is adjusted by qp:v -- default is 22; the lower the better):

ffmpeg -i input.avi -vf crop=624:272:12:102 -c:v libx264 -qp:v 22 -c:a copy output.mp4

