const RED = [
    
"#FFC0CB",
"#CD5C5C",
"#F08080"

/*Salmon	#FA8072	250, 128, 114
DarkSalmon	#E9967A	233, 150, 122
LightSalmon	#FFA07A	255, 160, 122
Crimson	#DC143C	220, 20, 60
Red	#FF0000	255, 0, 0
FireBrick	#B22222	178, 34, 34
DarkRed	#8B0000	139, 0, 0
Розовые тона:
Pink	#FFC0CB	255, 192, 203
LightPink	#FFB6C1	255, 182, 193
HotPink	#FF69B4	255, 105, 180
DeepPink	#FF1493	255, 20, 147
MediumVioletRed	#C71585	199, 21, 133
PaleVioletRed	#DB7093	219, 112, 147
Оранжевые тона:
LightSalmon	#FFA07A	255, 160, 122
Coral	#FF7F50	255, 127, 80
Tomato	#FF6347	255, 99, 71
OrangeRed	#FF4500	255, 69, 0
DarkOrange	#FF8C00	255, 140, 0
Orange	#FFA500	255, 165, 0
Жёлтые тона:
Gold	#FFD700	255, 215, 0
Yellow	#FFFF00	255, 255, 0*/
]

const BLUE = [
    /*Aqua	#00FFFF	0, 255, 255
Cyan	#00FFFF	0, 255, 255
LightCyan	#E0FFFF	224, 255, 255
PaleTurquoise	#AFEEEE	175, 238, 238
Aquamarine	#7FFFD4	127, 255, 212
Turquoise	#40E0D0	64, 224, 208
MediumTurquoise	#48D1CC	72, 209, 204
DarkTurquoise	#00CED1	0, 206, 209
CadetBlue	#5F9EA0	95, 158, 160
SteelBlue	#4682B4	70, 130, 180
LightSteelBlue	#B0C4DE	176, 196, 222
PowderBlue	#B0E0E6	176, 224, 230
LightBlue	#ADD8E6	173, 216, 230
SkyBlue	#87CEEB	135, 206, 235
LightSkyBlue	#87CEFA	135, 206, 250
DeepSkyBlue	#00BFFF	0, 191, 255
DodgerBlue	#1E90FF	30, 144, 255
CornflowerBlue	#6495ED	100, 149, 237
MediumSlateBlue	#7B68EE	123, 104, 238
RoyalBlue	#4169E1	65, 105, 225
Blue	#0000FF	0, 0, 255
MediumBlue	#0000CD	0, 0, 205
DarkBlue	#00008B	0, 0, 139*/
"#87CEFA",
"#000080",
"#191970"
]

let redCount = 0

export const getRed = () => RED[redCount++]

let blueCount = 0

export const getBlue = () => BLUE[blueCount++]