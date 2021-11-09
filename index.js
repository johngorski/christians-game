'GAME.BAS
'Christian Gorski Copyright 2008
'All Rights Reserved.
'Notes:
'>20 wiseman 04 = positive
'block 03 = sealed eye 02 = hidden platform 01 = platform 00 = nothing
'-1 = coins -2 = hidden key -3 = keyhole -4 = negative block
'-5 = sealed platform -6 = hidden keyhole -7 = open door -9 = false platform -10 = eye
'-11 = Portal� -12 = Portal� -13 = LifeUp -14 = AttackUp <=-20 = Key
'---------------------DECLARE---FUNCTIONS------------------------------------
DECLARE SUB Pause ()
DECLARE SUB GameOver ()
DECLARE SUB LBInfo (Choice$)
DECLARE SUB LevelBuilder ()
DECLARE SUB PlayLevel (ScreenMap%(), Message$, Demo$)
DECLARE SUB ShiftColor (Startx!, Starty!, XLength!, YLength!)
DECLARE SUB AI (SerialNumber!, ScreenMap%())
DECLARE SUB Jump (SerialNumber, Move$, ScreenMap%())
DECLARE SUB Directions ()
DECLARE SUB Game ()
DECLARE SUB MainMenu ()
DECLARE SUB DrawObj (Image() AS INTEGER, xlimit AS INTEGER, ylimit AS INTEGER, x AS INTEGER, y AS INTEGER, position$)
DECLARE SUB RecordDemo ()
DECLARE SUB SaveDemo ()
DECLARE SUB PlayDemo (FileName$, ScreenMap%())
DECLARE FUNCTION DetermineCoin! (LeScreenMap%())
DECLARE FUNCTION Spin$ (Direction AS STRING)
DECLARE FUNCTION WhichWorld$ (Dummy)
DECLARE FUNCTION ZeroLimit! (Number AS INTEGER)
DECLARE FUNCTION FlipBlocks% (block%)
'--------------------DECLARE-CONSTANTS---------------------------------------
CONST NoOfLevels = 10
COMMON SHARED RGT$, LFT$, UP$, DN$, ESC$, ENTR$, SPC$, Coins, YMAX, XMAX, F1$, F2$, F3$, F4$, F5$, F6$, F7$, F8$, F9$, F10$, F11$, NJTimer, YouShouldGo, Warp, World$, WorldsChecked, BuildLevel, ADMISSION, SharedTalk, SharedWiseMessage$,  _
SharedMessage$
DIM SHARED GlovePos AS INTEGER
RGT$ = CHR$(0) + "M"
LFT$ = CHR$(0) + "K"
UP$ = CHR$(0) + "H"
DN$ = CHR$(0) + "P"
F1$ = CHR$(0) + ";"
F2$ = CHR$(0) + "<"
F3$ = CHR$(0) + "="
F4$ = CHR$(0) + ">"
F5$ = CHR$(0) + "?"
F6$ = CHR$(0) + "@"
F7$ = CHR$(0) + "A"
F8$ = CHR$(0) + "B"
F9$ = CHR$(0) + "C"
F10$ = CHR$(0) + "D"
ESC$ = CHR$(27)
ENTR$ = CHR$(13)
SPC$ = CHR$(32)
YMAX = 200
XMAX = 320
ADMISSION = 0
KEY 15, CHR$(4) + CHR$(31)
KEY 16, CHR$(0) + CHR$(57)
KEY 17, CHR$(4) + CHR$(19)
KEY(11) ON 'up
KEY(12) ON 'left
KEY(13) ON 'right
KEY(14) ON 'down
KEY(15) ON 'Ctrl+S
KEY(16) ON
SCREEN 7, 0, 0, 1
'--------------DECLARE-ARRAYS-----------------------------------------------
DIM SHARED ScreenMap%(31, 19)
DIM SHARED ScreenMap2%(31, 19)
DIM SHARED ScreenMap3%(31, 19)
DIM SHARED ScreenMap4%(31, 19)
DIM SHARED ScreenMap5%(31, 19)
DIM SHARED ScreenMap6%(31, 19)
DIM SHARED ScreenMap7%(31, 19)
DIM SHARED ScreenMap8%(31, 19)
DIM SHARED ScreenMap9%(31, 19)
DIM SHARED ScreenMap10%(31, 19)
DIM SHARED ScreenMap11%(31, 19)
DIM SHARED BonusLevel%(31, 19)

DIM SHARED Dragonimage%(19, 19)
DIM SHARED Ravenimage%(19, 19)
DIM SHARED Snakeimage%(19, 19)
DIM SHARED WingedStatueimage%(19, 19)
DIM SHARED Stormyimage%(19, 19)
DIM SHARED Lightningimage%(19, 19)
DIM SHARED Fireimage%(19, 19)
DIM SHARED Ghostimage%(19, 19)
DIM SHARED LifeUpimage%(19, 19)
DIM SHARED AttackUpimage%(19, 19)
DIM SHARED MCloudimage%(19, 19)
DIM SHARED RCloudimage%(19, 19)
DIM SHARED LCloudimage%(19, 19)
'----------------LOAD-LEVELS-------------------------------------------------
OPEN "C:/BASIC/GAME/GAMELE~1/LEVEL2.LVL" FOR RANDOM AS #1 LEN = LEN(ScreenMap2%)
  RecordNumber = 1
  FOR x0 = 0 TO 31
    FOR y0 = 0 TO 19
      GET #1, RecordNumber, ScreenMap2%(x0, y0)
      RecordNumber = RecordNumber + 1
    NEXT y0
  NEXT x0
CLOSE #1
OPEN "C:/BASIC/GAME/GAMELE~1/LEVEL3.LVL" FOR RANDOM AS #1 LEN = LEN(ScreenMap3%)
  RecordNumber = 1
  FOR x0 = 0 TO 31
    FOR y0 = 0 TO 19
      GET #1, RecordNumber, ScreenMap3%(x0, y0)
      RecordNumber = RecordNumber + 1
    NEXT y0
  NEXT x0
CLOSE #1
OPEN "C:/BASIC/GAME/GAMELE~1/LEVEL4.LVL" FOR RANDOM AS #1 LEN = LEN(ScreenMap4%)
  RecordNumber = 1
  FOR x0 = 0 TO 31
    FOR y0 = 0 TO 19
      GET #1, RecordNumber, ScreenMap4%(x0, y0)
      RecordNumber = RecordNumber + 1
    NEXT y0
  NEXT x0
CLOSE #1
OPEN "C:/BASIC/GAME/GAMELE~1/LEVEL5.LVL" FOR RANDOM AS #1 LEN = LEN(ScreenMap5%)
  RecordNumber = 1
  FOR x0 = 0 TO 31
    FOR y0 = 0 TO 19
      GET #1, RecordNumber, ScreenMap5%(x0, y0)
      RecordNumber = RecordNumber + 1
    NEXT y0
  NEXT x0
CLOSE #1
OPEN "C:/BASIC/GAME/GAMELE~1/LEVEL6.LVL" FOR RANDOM AS #1 LEN = LEN(ScreenMap6%)
  RecordNumber = 1
  FOR x0 = 0 TO 31
    FOR y0 = 0 TO 19
      GET #1, RecordNumber, ScreenMap6%(x0, y0)
      RecordNumber = RecordNumber + 1
    NEXT y0
  NEXT x0
CLOSE #1
OPEN "C:/BASIC/GAME/GAMELE~1/LEVEL7.LVL" FOR RANDOM AS #1 LEN = LEN(ScreenMap7%)
  RecordNumber = 1
  FOR x0 = 0 TO 31
    FOR y0 = 0 TO 19
      GET #1, RecordNumber, ScreenMap7%(x0, y0)
      RecordNumber = RecordNumber + 1
    NEXT y0
  NEXT x0
CLOSE #1
OPEN "C:/BASIC/GAME/GAMELE~1/LEVEL8.LVL" FOR RANDOM AS #1 LEN = LEN(ScreenMap8%)
  RecordNumber = 1
  FOR x0 = 0 TO 31
    FOR y0 = 0 TO 19
      GET #1, RecordNumber, ScreenMap8%(x0, y0)
      RecordNumber = RecordNumber + 1
    NEXT y0
  NEXT x0
CLOSE #1
OPEN "C:/BASIC/GAME/GAMELE~1/LEVEL9.LVL" FOR RANDOM AS #1 LEN = LEN(ScreenMap9%)
  RecordNumber = 1
  FOR x0 = 0 TO 31
    FOR y0 = 0 TO 19
      GET #1, RecordNumber, ScreenMap9%(x0, y0)
      RecordNumber = RecordNumber + 1
    NEXT y0
  NEXT x0
CLOSE #1
OPEN "C:/BASIC/GAME/GAMELE~1/LEVEL10.LVL" FOR RANDOM AS #1 LEN = LEN(ScreenMap10%)
  RecordNumber = 1
  FOR x0 = 0 TO 31
    FOR y0 = 0 TO 19
      GET #1, RecordNumber, ScreenMap10%(x0, y0)
      RecordNumber = RecordNumber + 1
    NEXT y0
  NEXT x0
CLOSE #1
OPEN "C:/BASIC/GAME/GAMELE~1/LEVEL11.LVL" FOR RANDOM AS #1 LEN = LEN(ScreenMap11%)
  RecordNumber = 1
  FOR x0 = 0 TO 31
    FOR y0 = 0 TO 19
      GET #1, RecordNumber, ScreenMap11%(x0, y0)
      RecordNumber = RecordNumber + 1
    NEXT y0
  NEXT x0
CLOSE #1

OPEN "C:/BASIC/GAME/GAMELE~1/BONUSL~1.LVL" FOR RANDOM AS #1 LEN = LEN(BonusLevel%)
  RecordNumber = 1
  FOR x0 = 0 TO 31
    FOR y0 = 0 TO 19
      GET #1, RecordNumber, BonusLevel%(x0, y0)
      RecordNumber = RecordNumber + 1
    NEXT y0
  NEXT x0
CLOSE #1

'------------------------LOAD-BITMAPS----------------------------------------
OPEN "C:/BASIC/GAME/BITMAPS/DRAGON.BMP" FOR RANDOM AS #1 LEN = LEN(Dragonimage%)
  RecordNumber = 1
  FOR x0 = 0 TO 19
    FOR y0 = 0 TO 19
      GET #1, RecordNumber, Dragonimage%(x0, y0)
      RecordNumber = RecordNumber + 1
    NEXT y0
  NEXT x0
CLOSE #1
OPEN "C:/BASIC/GAME/BITMAPS/RAVEN.BMP" FOR RANDOM AS #1 LEN = LEN(Ravenimage%)
  RecordNumber = 1
  FOR x0 = 0 TO 19
    FOR y0 = 0 TO 19
      GET #1, RecordNumber, Ravenimage%(x0, y0)
      RecordNumber = RecordNumber + 1
    NEXT y0
  NEXT x0
CLOSE #1
OPEN "C:/BASIC/GAME/BITMAPS/SNAKE.BMP" FOR RANDOM AS #1 LEN = LEN(Snakeimage%)
  RecordNumber = 1
  FOR x0 = 0 TO 19
    FOR y0 = 0 TO 19
      GET #1, RecordNumber, Snakeimage%(x0, y0)
      RecordNumber = RecordNumber + 1
    NEXT y0
  NEXT x0
CLOSE #1
OPEN "C:/BASIC/GAME/BITMAPS/WSTATUE.BMP" FOR RANDOM AS #1 LEN = LEN(WingedStatueimage%)
  RecordNumber = 1
  FOR x0 = 0 TO 19
    FOR y0 = 0 TO 19
      GET #1, RecordNumber, WingedStatueimage%(x0, y0)
      RecordNumber = RecordNumber + 1
    NEXT y0
  NEXT x0
CLOSE #1
OPEN "C:/BASIC/GAME/BITMAPS/STORMY.BMP" FOR RANDOM AS #1 LEN = LEN(Stormyimage%)
  RecordNumber = 1
  FOR x0 = 0 TO 19
    FOR y0 = 0 TO 19
      GET #1, RecordNumber, Stormyimage%(x0, y0)
      RecordNumber = RecordNumber + 1
    NEXT y0
  NEXT x0
CLOSE #1
OPEN "C:/BASIC/GAME/BITMAPS/LIGHTNIN.BMP" FOR RANDOM AS #1 LEN = LEN(Lightningimage%)
  RecordNumber = 1
  FOR x0 = 0 TO 19
    FOR y0 = 0 TO 19
      GET #1, RecordNumber, Lightningimage%(x0, y0)
      RecordNumber = RecordNumber + 1
    NEXT y0
  NEXT x0
CLOSE #1
OPEN "C:/BASIC/GAME/BITMAPS/FIRE.BMP" FOR RANDOM AS #1 LEN = LEN(Fireimage%)
  RecordNumber = 1
  FOR x0 = 0 TO 19
    FOR y0 = 0 TO 19
      GET #1, RecordNumber, Fireimage%(x0, y0)
      RecordNumber = RecordNumber + 1
    NEXT y0
  NEXT x0
CLOSE #1
OPEN "C:/BASIC/GAME/BITMAPS/GHOST.BMP" FOR RANDOM AS #1 LEN = LEN(Ghostimage%)
  RecordNumber = 1
  FOR x0 = 0 TO 19
    FOR y0 = 0 TO 19
      GET #1, RecordNumber, Ghostimage%(x0, y0)
      RecordNumber = RecordNumber + 1
    NEXT y0
  NEXT x0
CLOSE #1
OPEN "C:/BASIC/GAME/BITMAPS/LIFEUP.BMP" FOR RANDOM AS #1 LEN = LEN(LifeUpimage%)
  RecordNumber = 1
  FOR x0 = 0 TO 19
    FOR y0 = 0 TO 19
      GET #1, RecordNumber, LifeUpimage%(x0, y0)
      RecordNumber = RecordNumber + 1
    NEXT y0
  NEXT x0
CLOSE #1
OPEN "C:/BASIC/GAME/BITMAPS/ATKUP.BMP" FOR RANDOM AS #1 LEN = LEN(AttackUpimage%)
  RecordNumber = 1
  FOR x0 = 0 TO 19
    FOR y0 = 0 TO 19
      GET #1, RecordNumber, AttackUpimage%(x0, y0)
      RecordNumber = RecordNumber + 1
    NEXT y0
  NEXT x0
CLOSE #1
OPEN "C:/BASIC/GAME/BITMAPS/MCLOUD.BMP" FOR RANDOM AS #1 LEN = LEN(MCloudimage%)
  RecordNumber = 1
  FOR x0 = 0 TO 19
    FOR y0 = 0 TO 19
      GET #1, RecordNumber, MCloudimage%(x0, y0)
      RecordNumber = RecordNumber + 1
    NEXT y0
  NEXT x0
CLOSE #1
OPEN "C:/BASIC/GAME/BITMAPS/RCLOUD.BMP" FOR RANDOM AS #1 LEN = LEN(RCloudimage%)
  RecordNumber = 1
  FOR x0 = 0 TO 19
    FOR y0 = 0 TO 19
      GET #1, RecordNumber, RCloudimage%(x0, y0)
      RecordNumber = RecordNumber + 1
    NEXT y0
  NEXT x0
CLOSE #1
OPEN "C:/BASIC/GAME/BITMAPS/LCLOUD.BMP" FOR RANDOM AS #1 LEN = LEN(LCloudimage%)
  RecordNumber = 1
  FOR x0 = 0 TO 19
    FOR y0 = 0 TO 19
      GET #1, RecordNumber, LCloudimage%(x0, y0)
      RecordNumber = RecordNumber + 1
    NEXT y0
  NEXT x0
CLOSE #1
'------------------HARDCODED-ARRAYS------------------------------------------
DATA -1,-1,-1,08,08,08,-1,-1,-1,-1,-1,-1,-1
DATA -1,-1,-1,08,15,08,-1,-1,-1,-1,-1,-1,-1
DATA -1,-1,08,15,15,08,-1,-1,-1,-1,-1,-1,-1
DATA 08,08,15,15,15,08,08,08,08,08,08,08,08
DATA 08,15,15,15,15,15,15,15,15,15,15,15,08
DATA 08,15,15,07,07,15,15,15,08,08,08,08,08
DATA 08,15,15,15,15,15,15,15,08,-1,-1,-1,-1
DATA 08,15,15,07,07,15,15,15,08,-1,-1,-1,-1
DATA 08,08,15,15,15,15,15,15,08,-1,-1,-1,-1
DATA -1,-1,08,08,08,08,08,08,08,-1,-1,-1,-1
DIM SHARED Gloveimage%(12, 9)
FOR y0 = 0 TO 9
  FOR x0 = 0 TO 12
    READ Gloveimage%(x0, y0)
  NEXT x0
NEXT y0

DATA -1,-1,-1,-1,-1,-1,-1,-1,-1,-1
DATA -1,-1,-1,-1,15,15,-1,-1,-1,-1
DATA -1,-1,-1,15,15,-1,-1,-1,-1,-1
DATA -1,-1,-1,15,04,04,04,04,-1,-1
DATA -1,01,-1,15,04,02,02,04,04,-1
DATA -1,01,01,15,15,01,02,-1,04,-1
DATA -1,-1,01,01,01,01,02,-1,-1,-1
DATA -1,-1,-1,-1,-1,02,02,-1,-1,-1
DATA -1,-1,-1,-1,02,02,-1,-1,-1,-1
DATA -1,-1,-1,-1,-1,-1,-1,-1,-1,-1
DIM SHARED Portalimage%(9, 9)
FOR y0 = 0 TO 9
  FOR x0 = 0 TO 9
    READ Portalimage%(x0, y0)
  NEXT x0
NEXT y0

DATA -1,-1,15,15,15,15,15,15,-1,-1,-1
DATA -1,15,15,03,03,03,03,15,15,-1,-1
DATA 15,15,03,03,03,03,03,03,15,15,-1
DATA 15,03,03,03,15,03,15,03,03,15,-1
DATA 15,03,03,03,15,03,15,03,03,15,-1
DATA 15,15,03,03,03,03,03,03,15,15,-1
DATA -1,15,03,03,03,03,03,03,15,-1,-1
DATA -1,-1,15,15,03,03,15,15,-1,-1,-1
DATA -1,15,03,03,15,15,03,03,15,-1,-1
DATA -1,15,03,03,03,15,03,03,03,15,-1
DATA -1,15,15,15,15,15,15,15,15,15,-1
DIM SHARED GuyImage%(10, 10)
FOR y0 = 0 TO 10
  FOR x0 = 0 TO 10
    READ GuyImage%(x0, y0)
  NEXT x0
NEXT y0

DATA -1,15,-1,-1,-1,-1,-1,15,-1,-1
DATA -1,15,15,-1,-1,-1,15,15,-1,-1
DATA -1,15,04,15,15,15,04,15,-1,-1
DATA -1,15,15,04,04,04,15,15,-1,-1
DATA -1,15,04,15,04,15,04,15,-1,-1
DATA -1,15,04,04,04,04,04,15,-1,-1
DATA -1,-1,15,15,15,15,15,-1,-1,-1
DATA -1,15,15,15,04,15,15,15,-1,-1
DATA -1,-1,-1,15,04,15,-1,-1,-1,-1
DATA -1,-1,15,15,15,15,15,-1,-1,-1
DIM SHARED Goblinimage%(9, 9)
FOR y0 = 0 TO 9
  FOR x0 = 0 TO 9
    READ Goblinimage%(x0, y0)
  NEXT x0
NEXT y0

DATA 06,06,06,06,06,06,06,06,06,06
DATA 06,06,06,06,06,06,06,06,06,06
DATA 06,06,06,06,06,06,06,06,06,06
DATA 06,06,06,06,06,06,14,14,06,06
DATA 06,06,06,06,06,14,14,14,14,06
DATA 06,06,06,06,06,14,14,14,14,06
DATA 06,06,06,06,06,06,14,14,06,06
DATA 06,06,06,06,06,06,06,06,06,06
DATA 06,06,06,06,06,06,06,06,06,06
DATA 06,06,06,06,06,06,06,06,06,06
DIM SHARED Doorimage%(9, 9)
FOR y0 = 0 TO 9
  FOR x0 = 0 TO 9
    READ Doorimage%(x0, y0)
  NEXT x0
NEXT y0

DATA -1,15,15,-1
DATA 15,03,03,15
DATA 15,03,03,15
DATA -1,15,15,-1
DIM SHARED Handimage%(3, 3)
FOR y0 = 0 TO 3
  FOR x0 = 0 TO 3
    READ Handimage%(x0, y0)
  NEXT x0
NEXT y0

DATA -1,-1,-1,-1,-1,-1,-1,-1,-1,-1
DATA -1,-1,-1,15,15,15,15,-1,-1,-1
DATA -1,-1,15,01,01,01,01,15,-1,-1
DATA -1,15,01,01,01,15,15,01,15,-1
DATA 15,15,01,01,00,15,15,01,15,15
DATA 15,15,01,01,00,00,01,01,15,15
DATA -1,15,01,01,01,01,01,01,15,-1
DATA -1,-1,15,01,01,01,01,15,-1,-1
DATA -1,-1,-1,15,15,15,15,-1,-1,-1
DATA -1,-1,-1,-1,-1,-1,-1,-1,-1,-1
DIM SHARED Eyeimage%(9, 9)
FOR y0 = 0 TO 9
  FOR x0 = 0 TO 9
    READ Eyeimage%(x0, y0)
  NEXT x0
NEXT y0

DATA -1,-1,-1,07,-1,-1,-1
DATA -1,-1,07,07,07,-1,-1
DATA -1,-1,07,07,07,-1,-1
DATA -1,-1,07,07,07,-1,-1
DATA -1,-1,07,07,07,-1,-1
DATA -1,-1,07,07,07,-1,-1
DATA -1,-1,07,07,07,-1,-1
DATA -1,-1,-1,07,-1,-1,-1
DATA 15,15,15,15,15,15,15
DATA -1,15,15,15,15,15,-1
DATA -1,-1,-1,15,-1,-1,-1
DATA -1,-1,-1,15,-1,-1,-1
DIM Swordimage%(6, 11)
FOR y0 = 0 TO 11
  FOR x0 = 0 TO 6
    READ Swordimage%(x0, y0)
  NEXT
NEXT

DATA -2,-2,-2,-2,-2,-2,-2,-2,-2,-2
DATA -2,-2,-2,-2,-1,-1,-2,-2,-2,-2
DATA -2,-2,-2,-1,-1,-1,-1,-2,-2,-2
DATA -2,-2,-2,-1,-1,-1,-1,-2,-2,-2
DATA -2,-2,-2,-2,-1,-1,-2,-2,-2,-2
DATA -2,-2,-2,-2,-1,-1,-2,-2,-2,-2
DATA -2,-2,-2,-2,-1,-1,-2,-2,-2,-2
DATA -2,-2,-2,-1,-1,-1,-1,-2,-2,-2
DATA -2,-2,-2,-1,-1,-1,-1,-2,-2,-2
DATA -2,-2,-2,-2,-2,-2,-2,-2,-2,-2
DIM SHARED Keyholeimage%(9, 9)
FOR y0 = 0 TO 9
  FOR x0 = 0 TO 9
    READ Keyholeimage%(x0, y0)
  NEXT x0
NEXT y0

DATA 14,14,14,14,14,14,14,-1,-1,-1
DATA 14,-1,-1,-1,-1,-1,14,-1,-1,-1
DATA 14,-1,-1,-1,-1,-1,14,-1,-1,-1
DATA 14,-1,-1,-1,-1,-1,14,-1,-1,-1
DATA 14,14,14,14,14,14,14,-1,-1,-1
DATA -1,-1,14,14,-1,-1,-1,-1,-1,-1
DATA -1,-1,14,14,-1,-1,-1,-1,-1,-1
DATA -1,-1,14,14,14,14,-1,-1,-1,-1
DATA -1,-1,14,14,-1,-1,-1,-1,-1,-1
DATA -1,-1,14,14,14,14,14,-1,-1,-1
DIM SHARED Keyimage%(9, 9)
FOR y0 = 0 TO 9
  FOR x0 = 0 TO 9
    READ Keyimage%(x0, y0)
  NEXT x0
NEXT y0



DATA 00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00
DATA 00,00,00,00,00,-1,00,00,00,-1,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00
DATA 00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00
DATA 00,00,00,00,00,00,00,00,00,00,11,00,00,00,00,00,00,01,01,01,01,01,00,00,00,00,00,00,00,00,00,00
DATA 00,-1,-1,-1,-1,00,00,00,00,00,01,01,01,01,01,01,01,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00
DATA 01,01,01,01,01,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00
DATA 00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,01,00,00,00,00,00,00,00,00,00
DATA 00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,01,01,01,00,00,00,00,00,00,00,00
DATA 00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,01,01,01,01,01,00,-1,00,00,00,00,00
DATA 00,00,00,00,00,00,00,00,00,00,00,01,01,01,01,01,01,01,01,01,01,01,01,01,01,-9,-9,01,01,01,-1,00
DATA 00,00,00,00,00,00,00,00,00,00,01,01,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,-1,00
DATA 00,00,00,00,00,00,00,00,00,01,01,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,-1,00
DATA 00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00
DATA 00,00,00,00,-3,00,00,00,00,00,00,00,00,00,00,00,-2,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00
DATA -5,-5,-5,01,01,01,01,-5,-5,-5,-5,-5,-5,-5,-5,-5,-5,-5,-5,-5,-5,-5,-5,-5,-5,-5,-5,-5,-5,-5,-5,00
DATA -5,-5,-5,-5,-5,-5,-5,-5,-5,01,01,-5,-5,-5,-5,-5,-5,-5,-5,-5,-5,-5,-5,-5,-5,-5,-5,-5,-5,-5,-5,00
DATA 00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00
DATA 00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00
DATA 00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,11,00,00,00,00,00,00,00,00,00,00,00
DATA 01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,00,00,00,00,00,00,00,00,00,00,00

DIM SHARED ScreenMap1%(31, 19)
FOR y0 = 0 TO 19
  FOR x0 = 0 TO 31
    READ ScreenMap1%(x0, y0)
  NEXT x0
NEXT y0

'-----------------------------TYPES------------------------------------------

TYPE LOCATION
  x AS INTEGER
  y AS INTEGER
END TYPE

TYPE PLAYER
  x AS INTEGER                        'marks position
  y AS INTEGER
  Health AS INTEGER
  MaxHp AS INTEGER
  AP AS SINGLE                        'Attack points
  DP AS SINGLE                        'Defense points
  Status AS STRING * 4                'Bodily Status; "GOOD" "DEAD" "GONE"...
  Mvmnt AS STRING * 2                 'Jumping Status
  Direc AS STRING * 2                 'Direction Facing
  JTime AS INTEGER                    'Jumping Timer
  ScreenX AS INTEGER
  ScreenY AS INTEGER
END TYPE

TYPE ENEMY
  x AS INTEGER
  y AS INTEGER
  Health AS INTEGER
  AP AS SINGLE
  DP AS SINGLE
  Status AS STRING * 4
  Direc AS STRING * 2
  Race AS STRING * 10
  Item AS STRING * 4
  Intelligence AS INTEGER
  Speed AS SINGLE
  ScreenX AS INTEGER
  ScreenY AS INTEGER
  CanFly AS INTEGER
  NotBounce AS INTEGER
  PlaceHold AS LOCATION
  PlaceVal AS INTEGER
END TYPE

TYPE PERSON
  Speech AS STRING * 200
  Direc AS STRING * 2
END TYPE

DIM SHARED Guy AS PLAYER
DIM SHARED DemoGuy(1 TO 200) AS PLAYER
DIM SHARED Enemies(1 TO 15) AS ENEMY
DIM SHARED WiseMen(1 TO 10) AS PERSON
DIM SHARED PortalAlpha AS LOCATION
DIM SHARED PortalBeta AS LOCATION
'--------------------------ENEMY-TYPES---------------------------------------
DIM SHARED NoOneTemplate AS ENEMY
  NoOneTemplate.Race = "NO ONE"
  NoOneTemplate.Health = 0
  NoOneTemplate.Intelligence = 0
  NoOneTemplate.Speed = 0
  NoOneTemplate.AP = 0
  NoOneTemplate.DP = 1
  NoOneTemplate.CanFly = 0
  NoOneTemplate.NotBounce = 0
  NoOneTemplate.Status = "GONE"
  NoOneTemplate.Direc = ""
  NoOneTemplate.Item = ""

DIM SHARED GoblinTemplate AS ENEMY
  GoblinTemplate.Race = "GOBLIN"
  GoblinTemplate.Health = 1
  GoblinTemplate.Intelligence = 5
  GoblinTemplate.Speed = 3
  GoblinTemplate.AP = 1
  GoblinTemplate.DP = 1
  GoblinTemplate.CanFly = 0
  GoblinTemplate.NotBounce = 0
  GoblinTemplate.Status = "GOOD"
  GoblinTemplate.Direc = "UR"
  GoblinTemplate.Item = "01"
 
DIM SHARED RavenTemplate AS ENEMY
  RavenTemplate.Race = "RAVEN"
  RavenTemplate.Health = 3
  RavenTemplate.Intelligence = 3
  RavenTemplate.Speed = 5
  RavenTemplate.AP = 1
  RavenTemplate.DP = 1
  RavenTemplate.CanFly = -1
  RavenTemplate.NotBounce = 0
  RavenTemplate.Status = "GOOD"
  RavenTemplate.Direc = "UR"
  RavenTemplate.Item = "02"

DIM SHARED DragonTemplate AS ENEMY
  DragonTemplate.Race = "DRAGON"
  DragonTemplate.Health = 5
  DragonTemplate.Intelligence = 4
  DragonTemplate.Speed = 5
  DragonTemplate.AP = 2
  DragonTemplate.DP = 1
  DragonTemplate.CanFly = -1
  DragonTemplate.NotBounce = 0
  DragonTemplate.Status = "GOOD"
  DragonTemplate.Direc = "UR"
  DragonTemplate.Item = "05"

DIM SHARED WingedStatueTemplate AS ENEMY
  WingedStatueTemplate = RavenTemplate
  WingedStatueTemplate.Race = "WSTATUE"
  WingedStatueTemplate.AP = 0
  WingedStatueTemplate.DP = -1
  WingedStatueTemplate.Item = "X000"

DIM SHARED SnakeTemplate AS ENEMY
  SnakeTemplate.Race = "SNAKE"
  SnakeTemplate.Health = 4
  SnakeTemplate.Intelligence = 3
  SnakeTemplate.Speed = 5
  SnakeTemplate.AP = 3
  SnakeTemplate.DP = 2
  SnakeTemplate.CanFly = 0
  SnakeTemplate.NotBounce = 0
  SnakeTemplate.Status = "GOOD"
  SnakeTemplate.Direc = "UR"
  SnakeTemplate.Item = "003"

DIM SHARED StormyTemplate AS ENEMY
  StormyTemplate.Race = "STORMY"
  StormyTemplate.Health = 2
  StormyTemplate.Intelligence = 5
  StormyTemplate.Speed = 10
  StormyTemplate.AP = 1
  StormyTemplate.DP = 1
  StormyTemplate.CanFly = -1
  StormyTemplate.NotBounce = 0
  StormyTemplate.Status = "GOOD"
  StormyTemplate.Direc = "UR"
  StormyTemplate.Item = "002"

DIM SHARED LightningTemplate AS ENEMY
  LightningTemplate.Race = "LIGHTNING"
  LightningTemplate.Health = 3
  LightningTemplate.Intelligence = 0
  LightningTemplate.Speed = 5
  LightningTemplate.AP = 4
  LightningTemplate.DP = 1
  LightningTemplate.CanFly = 0
  LightningTemplate.NotBounce = -1
  LightningTemplate.Status = "GOOD"
  LightningTemplate.Direc = "UR"
  LightningTemplate.Item = "X000"

DIM SHARED FireTemplate AS ENEMY
  FireTemplate.Race = "FIRE"
  FireTemplate.Health = 1
  FireTemplate.Intelligence = 0
  FireTemplate.Speed = 10
  FireTemplate.AP = 2
  FireTemplate.DP = -1
  FireTemplate.CanFly = -1
  FireTemplate.NotBounce = -1
  FireTemplate.Status = "GOOD"
  FireTemplate.Direc = "UR"
  FireTemplate.Item = "X000"

DIM SHARED GhostTemplate AS ENEMY
  GhostTemplate.Race = "GHOST"
  GhostTemplate.Health = 1
  GhostTemplate.Intelligence = 4
  GhostTemplate.Speed = 1
  GhostTemplate.AP = 3
  GhostTemplate.DP = -1
  GhostTemplate.CanFly = -1
  GhostTemplate.NotBounce = -1
  GhostTemplate.Status = "GOOD"
  GhostTemplate.Direc = "UR"
  GhostTemplate.Item = "X000"

'----------------------WORDS-OF-WISDOM---------------------------------------
WiseMen(1).Speech = "When time has stopped go to the place ofstrange colors. Create a valley between two <ALT>ernatives. Then speak the name of your destination."
WiseMen(2).Speech = "Nice work on the level."
WiseMen(3).Speech = "Come with me."
WiseMen(4).Speech = "Trying to talk to some blocks changes   their mind about colors."
WiseMen(5).Speech = "If you come from below, you can climb   the edges of blocks."
'-----------------------START!!!---------------------------------------------

MainMenu

'--------------------------GOSUBS--------------------------------------------
LevelRight:
    Guy.x = Guy.x + 5
    IF Guy.x > 315 THEN Guy.x = 315
    IF Guy.ScreenX < 30 THEN
      IF ScreenMap%(Guy.ScreenX + 1, Guy.ScreenY) = -11 THEN
        Guy.x = (PortalBeta.x + 1) * 10
        Guy.y = (PortalBeta.y * 10) - 1
      ELSEIF ScreenMap%(Guy.ScreenX + 1, Guy.ScreenY) = -12 THEN
        Guy.x = (PortalAlpha.x + 1) * 10
        Guy.y = (PortalAlpha.y * 10) - 1
      END IF
     
      IF ScreenMap%(Guy.ScreenX + 1, Guy.ScreenY) > 0 THEN Guy.x = Guy.x - 5
    END IF
    MID$(Guy.Direc, 2) = "R"
    Guy.ScreenX = INT(Guy.x / 10)
    Guy.ScreenY = INT((Guy.y + 1) / 10)
    IF ScreenMap%(Guy.ScreenX, Guy.ScreenY) = -1 THEN Coins = Coins + 1: ScreenMap%(Guy.ScreenX, Guy.ScreenY) = 0
    IF Guy.ScreenX < 30 THEN
      IF ScreenMap%(Guy.ScreenX, Guy.ScreenY) <= -20 AND ScreenMap%(Guy.ScreenX + 1, Guy.ScreenY) <= 0 THEN
        ScreenMap%(Guy.ScreenX, Guy.ScreenY) = ScreenMap%(Guy.ScreenX, Guy.ScreenY) + 20: ScreenMap%(Guy.ScreenX + 1, Guy.ScreenY) = ScreenMap%(Guy.ScreenX + 1, Guy.ScreenY) - 20
      END IF
    END IF

    RETURN
LevelLeft:
    Guy.x = Guy.x - 5
    IF Guy.x < 5 THEN Guy.x = 5
    IF Guy.ScreenX > 0 THEN
      IF ScreenMap%(Guy.ScreenX - 1, Guy.ScreenY) = -11 THEN
        Guy.x = (PortalBeta.x - 1) * 10
        Guy.y = (PortalBeta.y * 10) - 1
      ELSEIF ScreenMap%(Guy.ScreenX - 1, Guy.ScreenY) = -12 THEN
        Guy.x = (PortalAlpha.x - 1) * 10
        Guy.y = (PortalAlpha.y * 10) - 1
      END IF
      IF ScreenMap%(INT(Guy.x / 10), Guy.ScreenY) > 0 THEN Guy.x = Guy.x + 5
    END IF
    MID$(Guy.Direc, 2) = "L"
    Guy.ScreenX = INT(Guy.x / 10)
    Guy.ScreenY = INT((Guy.y + 1) / 10)
    IF ScreenMap%(Guy.ScreenX, Guy.ScreenY) = -1 THEN Coins = Coins + 1: ScreenMap%(Guy.ScreenX, Guy.ScreenY) = 0
    IF Guy.ScreenX > 1 THEN
      IF ScreenMap%(Guy.ScreenX, Guy.ScreenY) <= -20 AND ScreenMap%(Guy.ScreenX - 1, Guy.ScreenY) <= 0 THEN
        ScreenMap%(Guy.ScreenX, Guy.ScreenY) = ScreenMap%(Guy.ScreenX, Guy.ScreenY) + 20: ScreenMap%(Guy.ScreenX - 1, Guy.ScreenY) = ScreenMap%(Guy.ScreenX - 1, Guy.ScreenY) - 20
      END IF
    END IF
    IF Guy.ScreenX > 0 THEN
      IF ScreenMap%(Guy.ScreenX + 1, Guy.ScreenY) <= -20 AND ScreenMap%(Guy.ScreenX, Guy.ScreenY) <= 0 THEN
        ScreenMap%(Guy.ScreenX + 1, Guy.ScreenY) = ScreenMap%(Guy.ScreenX + 1, Guy.ScreenY) + 20: ScreenMap%(Guy.ScreenX, Guy.ScreenY) = ScreenMap%(Guy.ScreenX, Guy.ScreenY) - 20
      END IF
    END IF
    
    RETURN

LevelJump:
  IF Guy.JTime > 0 AND Guy.Mvmnt <> "DN" THEN
    IF Guy.y > 10 THEN
      IF ScreenMap%(Guy.ScreenX, Guy.ScreenY - 1) = -11 THEN
        Guy.x = PortalBeta.x * 10
        Guy.y = ((PortalBeta.y - 1) * 10) - 1
      ELSEIF ScreenMap%(Guy.ScreenX, Guy.ScreenY - 1) = -12 THEN
        Guy.x = PortalAlpha.x * 10
        Guy.y = ((PortalAlpha.y - 1) * 10) - 1
      END IF
      IF ScreenMap%(Guy.ScreenX, Guy.ScreenY - 1) <= 0 OR RIGHT$(STR$(Guy.x), 1) = "5" AND ScreenMap%(Guy.ScreenX + 1, Guy.ScreenY - 1) <= 0 THEN
        Guy.y = Guy.y - 5
      END IF
      Guy.Mvmnt = "UP"
    END IF
  END IF
    Guy.ScreenX = INT(Guy.x / 10)
    Guy.ScreenY = INT((Guy.y + 1) / 10)
    IF ScreenMap%(Guy.ScreenX, Guy.ScreenY) = -1 THEN Coins = Coins + 1: ScreenMap%(Guy.ScreenX, Guy.ScreenY) = 0

RETURN
Down:
  IF ScreenMap%(Guy.ScreenX, Guy.ScreenY) = -7 THEN YouShouldGo = 1
RETURN
Save:
        SCREEN 12
        INPUT "FileName"; FileName$
        FileName$ = UCASE$(FileName$)
        IF RIGHT$(FileName$, 4) <> ".LVL" THEN FileName$ = FileName$ + ".LVL"
        SCREEN 7, 0, 0, 1
        OPEN "C:/BASIC/GAME/CUSTOM~1/" + FileName$ FOR RANDOM AS #1 LEN = LEN(ScreenMap%)
          RecordNumber = 1
          FOR x0 = 0 TO 31
            FOR y0 = 0 TO 19
              PUT #1, RecordNumber, ScreenMap%(x0, y0)
              RecordNumber = RecordNumber + 1
            NEXT y0
          NEXT x0
        CLOSE #1
        PRINT "SAVED": PCOPY 0, 1
        SLEEP
        RETURN
MenuUp:
  IF GlovePos > 200 THEN GlovePos = GlovePos - 2
  RETURN
MenuDown:
  IF GlovePos < 310 THEN GlovePos = GlovePos + 2
  RETURN

Space:  
    SELECT CASE RIGHT$(Guy.Direc, 1)
    CASE "R"
      IF Guy.ScreenX < 31 THEN
        IF ScreenMap%(Guy.ScreenX + 1, Guy.ScreenY) > 20 AND ScreenMap%(Guy.ScreenX + 1, Guy.ScreenY) <= 30 THEN
          SharedWiseMessage$ = WiseMen(ScreenMap%(Guy.ScreenX + 1, Guy.ScreenY) - 20).Speech
          SharedTalk = 100
        ELSE SharedTalk = 0
        END IF
      ELSE SharedTalk = 0
      END IF
    CASE "L"
      IF Guy.ScreenX > 0 THEN
        IF ScreenMap%(Guy.ScreenX - 1, Guy.ScreenY) > 20 AND ScreenMap%(Guy.ScreenX - 1, Guy.ScreenY) <= 30 THEN
          SharedWiseMessage$ = WiseMen(ScreenMap%(Guy.ScreenX - 1, Guy.ScreenY) - 20).Speech
          SharedTalk = 100
        ELSE SharedTalk = 0
        END IF
      ELSE SharedTalk = 0
      END IF
    END SELECT
  
    IF ScreenMap%(Guy.ScreenX, Guy.ScreenY) = -4 THEN
      IF Guy.ScreenY > 1 THEN
        IF Guy.ScreenX > 1 THEN
          ScreenMap%(Guy.ScreenX - 1, Guy.ScreenY - 1) = FlipBlocks(ScreenMap%(Guy.ScreenX - 1, Guy.ScreenY - 1))
        END IF
        IF Guy.ScreenX < 31 THEN
          ScreenMap%(Guy.ScreenX + 1, Guy.ScreenY - 1) = FlipBlocks(ScreenMap%(Guy.ScreenX + 1, Guy.ScreenY - 1))
        END IF
        ScreenMap%(Guy.ScreenX, Guy.ScreenY - 1) = FlipBlocks(ScreenMap%(Guy.ScreenX, Guy.ScreenY - 1))
      END IF
    
      IF Guy.ScreenY < 19 THEN
        IF Guy.ScreenX > 1 THEN
          ScreenMap%(Guy.ScreenX - 1, Guy.ScreenY + 1) = FlipBlocks(ScreenMap%(Guy.ScreenX - 1, Guy.ScreenY + 1))
        END IF
        IF Guy.ScreenX < 31 THEN
          ScreenMap%(Guy.ScreenX + 1, Guy.ScreenY + 1) = FlipBlocks(ScreenMap%(Guy.ScreenX + 1, Guy.ScreenY + 1))
        END IF
        ScreenMap%(Guy.ScreenX, Guy.ScreenY + 1) = FlipBlocks(ScreenMap%(Guy.ScreenX, Guy.ScreenY + 1))
      END IF
      IF Guy.ScreenX > 1 THEN
        ScreenMap%(Guy.ScreenX - 1, Guy.ScreenY) = FlipBlocks(ScreenMap%(Guy.ScreenX - 1, Guy.ScreenY))
      END IF
      IF Guy.ScreenX < 31 THEN
        ScreenMap%(Guy.ScreenX + 1, Guy.ScreenY) = FlipBlocks(ScreenMap%(Guy.ScreenX + 1, Guy.ScreenY))
      END IF
    END IF
    RETURN

Restart:
  World$ = SharedMessage$
  Warp = 1
  RETURN

SUB AI (SerialNumber, ScreenMap%())
  IF Enemies(SerialNumber).Status = "GONE" THEN EXIT SUB        'dead men tell
                                                                ' no tales
  DIM EClone AS ENEMY
  ScreenMap%(Enemies(SerialNumber).PlaceHold.x, Enemies(SerialNumber).PlaceHold.y) = Enemies(SerialNumber).PlaceVal
  Enemies(SerialNumber).ScreenX = INT(Enemies(SerialNumber).x / 10)
  Enemies(SerialNumber).ScreenY = INT(Enemies(SerialNumber).y / 10)
  DistX = Guy.x - Enemies(SerialNumber).x
  DistY = Guy.y - Enemies(SerialNumber).y + 1
  ItemType$ = LEFT$(Enemies(SerialNumber).Item, 1): ItemNo = VAL(RIGHT$(Enemies(SerialNumber).Item, 3))
 
  IF ScreenMap%(Enemies(SerialNumber).ScreenX, Enemies(SerialNumber).ScreenY) <> -15 THEN
    Enemies(SerialNumber).PlaceHold.x = Enemies(SerialNumber).ScreenX
    Enemies(SerialNumber).PlaceHold.y = Enemies(SerialNumber).ScreenY
    Enemies(SerialNumber).PlaceVal = ScreenMap%(Enemies(SerialNumber).PlaceHold.x, Enemies(SerialNumber).PlaceHold.y)
    ScreenMap%(Enemies(SerialNumber).PlaceHold.x, Enemies(SerialNumber).PlaceHold.y) = -15
  ELSE    'anchor
    SELECT CASE RIGHT$(Enemies(SerialNumber).Direc, 1)
    CASE "L": Enemies(SerialNumber).x = Enemies(SerialNumber).x + 5
    CASE "R": Enemies(SerialNumber).x = Enemies(SerialNumber).x - 5
    END SELECT
  END IF
  

  IF Enemies(SerialNumber).Intelligence >= 4 THEN                'smart move
    
      IF DistY < -Enemies(SerialNumber).Speed + 1 THEN EMove$ = UP$  'go nearer
      IF DistY > Enemies(SerialNumber).Speed - 1 THEN EMove$ = DN$     ' to guy
      IF DistX < -Enemies(SerialNumber).Speed + 1 THEN EMove$ = LFT$
      IF DistX > Enemies(SerialNumber).Speed - 1 THEN EMove$ = RGT$
   
      IF Enemies(SerialNumber).Race = "DRAGON    " THEN
        IF DistY < -Enemies(SerialNumber).Speed THEN EMove$ = UP$
        IF DistY > Enemies(SerialNumber).Speed THEN EMove$ = DN$
        IF Guy.Mvmnt <> "DN" THEN
          IF EMove$ = LFT$ OR EMove$ = RGT$ THEN
            IF Enemies(SerialNumber + 1).Status = "GONE" THEN
              IF EMove$ = LFT$ THEN Enemies(SerialNumber).Direc = "UL"
              IF EMove$ = RGT$ THEN Enemies(SerialNumber).Direc = "UR"
              Enemies(SerialNumber + 1) = FireTemplate
              Enemies(SerialNumber + 1).Direc = Enemies(SerialNumber).Direc
              Enemies(SerialNumber + 1).x = Enemies(SerialNumber).x
              Enemies(SerialNumber + 1).y = Enemies(SerialNumber).y
              Enemies(SerialNumber + 1).Health = 15
              Enemies(SerialNumber + 1).DP = 2
              Enemies(SerialNumber + 1).Intelligence = 3
              EMove$ = ""      'anchor
            ELSEIF Enemies(SerialNumber + 1).Health > 13 THEN EMove$ = ""
            END IF
          END IF
        END IF
      END IF

      IF Guy.Mvmnt = "DN" THEN
        SELECT CASE EMove$
        CASE DN$: EMove$ = UP$
        CASE UP$: EMove$ = DN$
        CASE LFT$: EMove$ = RGT$
        CASE RGT$: EMove$ = LFT$
        END SELECT
      END IF
   
    IF Enemies(SerialNumber).Race = "GOBLIN    " THEN
      SELECT CASE EMove$
      CASE DN$
        SELECT CASE RIGHT$(Enemies(SerialNumber).Direc, 1)
        CASE "R": EMove$ = LFT$
        CASE "L": EMove$ = RGT$
        END SELECT
      CASE UP$
        SELECT CASE RIGHT$(Enemies(SerialNumber).Direc, 1)
        CASE "R": EMove$ = LFT$
        CASE "L": EMove$ = RGT$
        END SELECT
      CASE RGT$
        IF Enemies(SerialNumber).ScreenX < 31 THEN
          IF ScreenMap%(Enemies(SerialNumber).ScreenX + 1, Enemies(SerialNumber).ScreenY + 1) <= 0 THEN EMove$ = ""
        END IF
      CASE LFT$
        IF Enemies(SerialNumber).ScreenX > 0 THEN
          IF ScreenMap%(Enemies(SerialNumber).ScreenX - 1, Enemies(SerialNumber).ScreenY + 1) <= 0 THEN EMove$ = ""
        END IF
      END SELECT
    END IF
   
    IF Enemies(SerialNumber).Race = "STORMY    " THEN
      SELECT CASE EMove$
        CASE DN$
          EMove$ = ""
          IF Enemies(SerialNumber + 1).Status = "GONE" THEN
            Enemies(SerialNumber + 1) = LightningTemplate
            Enemies(SerialNumber + 1).x = Enemies(SerialNumber).x
            Enemies(SerialNumber + 1).y = Enemies(SerialNumber).y + 10
          END IF
        CASE UP$: EMove$ = ""
      END SELECT
    END IF

    IF ABS(DistX) < Enemies(SerialNumber).Speed THEN Enemies(SerialNumber).x = Guy.x
    'IF ABS(DistY) < Enemies(SerialNumber).Speed THEN Enemies(SerialNumber).y = Guy.y + 1
    Enemies(SerialNumber).ScreenX = INT(Enemies(SerialNumber).x / 10)
    Enemies(SerialNumber).ScreenY = INT(Enemies(SerialNumber).y / 10)

  ELSEIF Enemies(SerialNumber).Intelligence > 2 THEN
    
      SELECT CASE RIGHT$(Enemies(SerialNumber).Direc, 1)
      CASE "R": EMove$ = RGT$
        IF Enemies(SerialNumber).ScreenX < 31 THEN
          IF ScreenMap%(Enemies(SerialNumber).ScreenX + 1, Enemies(SerialNumber).ScreenY) > 0 OR ScreenMap%(Enemies(SerialNumber).ScreenX + 1, Enemies(SerialNumber).ScreenY) = -15 THEN
            EMove$ = LFT$
          END IF
        ELSE
          EMove$ = LFT$
        END IF
      CASE "L": EMove$ = LFT$
        IF Enemies(SerialNumber).ScreenX > 0 THEN
          IF ScreenMap%(Enemies(SerialNumber).ScreenX - 1, Enemies(SerialNumber).ScreenY) > 0 OR ScreenMap%(Enemies(SerialNumber).ScreenX - 1, Enemies(SerialNumber).ScreenY) = -15 THEN
            EMove$ = RGT$
          END IF
        ELSE
          EMove$ = RGT$
        END IF
      END SELECT
  END IF
  

  SELECT CASE EMove$
  CASE RGT$:
   
    IF Enemies(SerialNumber).ScreenX < 31 THEN
      IF ScreenMap%(Enemies(SerialNumber).ScreenX + 1, Enemies(SerialNumber).ScreenY) <= 0 AND ScreenMap%(Enemies(SerialNumber).ScreenX + 1, Enemies(SerialNumber).ScreenY) <> -15 THEN
        Enemies(SerialNumber).x = Enemies(SerialNumber).x + Enemies(SerialNumber).Speed: MID$(Enemies(SerialNumber).Direc, 2) = "R"
      END IF
    END IF
  CASE LFT$:
    IF Enemies(SerialNumber).ScreenX > 0 THEN
      IF ScreenMap%(Enemies(SerialNumber).ScreenX - 1, Enemies(SerialNumber).ScreenY) <= 0 AND ScreenMap%(Enemies(SerialNumber).ScreenX - 1, Enemies(SerialNumber).ScreenY) <> -15 THEN
        Enemies(SerialNumber).x = Enemies(SerialNumber).x - Enemies(SerialNumber).Speed: MID$(Enemies(SerialNumber).Direc, 2) = "L"
      END IF
    END IF
  CASE UP$:
    IF Enemies(SerialNumber).ScreenY > 0 THEN
      IF ScreenMap%(Enemies(SerialNumber).ScreenX, Enemies(SerialNumber).ScreenY - 1) <= 0 AND ScreenMap%(Enemies(SerialNumber).ScreenX, Enemies(SerialNumber).ScreenY - 1) <> -15 THEN
        Enemies(SerialNumber).y = Enemies(SerialNumber).y - Enemies(SerialNumber).Speed
      END IF
    END IF
  CASE DN$:
    IF Enemies(SerialNumber).ScreenY < 19 THEN
      IF ScreenMap%(Enemies(SerialNumber).ScreenX, Enemies(SerialNumber).ScreenY + 1) <= 0 AND ScreenMap%(Enemies(SerialNumber).ScreenX, Enemies(SerialNumber).ScreenY + 1) <> -15 THEN
        Enemies(SerialNumber).y = Enemies(SerialNumber).y + Enemies(SerialNumber).Speed
      END IF
    END IF
  END SELECT

  IF NOT Enemies(SerialNumber).CanFly THEN
    IF Enemies(SerialNumber).ScreenY < 19 THEN
      IF ScreenMap%(Enemies(SerialNumber).ScreenX, Enemies(SerialNumber).ScreenY + 1) <= 0 AND ScreenMap%(Enemies(SerialNumber).ScreenX, Enemies(SerialNumber).ScreenY + 1) <> -15 THEN
        Enemies(SerialNumber).y = Enemies(SerialNumber).y + 10
      ELSE
        Enemies(SerialNumber).y = Enemies(SerialNumber).ScreenY * 10
      END IF
    ELSE
      Enemies(SerialNumber).Health = 0
    END IF
  END IF
 
  SELECT CASE Enemies(SerialNumber).Race
  CASE "LIGHTNING "
    IF ScreenMap%(Enemies(SerialNumber).ScreenX, Enemies(SerialNumber).ScreenY + 1) > 0 THEN
      EClone = Enemies(SerialNumber)
      Enemies(SerialNumber) = FireTemplate
      Enemies(SerialNumber).Health = 5
      Enemies(SerialNumber).DP = 2
      Enemies(SerialNumber).x = EClone.x
      Enemies(SerialNumber).y = EClone.y
      Enemies(SerialNumber).PlaceHold = EClone.PlaceHold
      Enemies(SerialNumber).PlaceVal = EClone.PlaceVal
    END IF
  CASE "FIRE      "
    ETrueDamage = ZeroLimit(INT(Enemies(SerialNumber).AP / Enemies(SerialNumber).DP))
    Enemies(SerialNumber).Health = Enemies(SerialNumber).Health - ETrueDamage
  END SELECT

  IF Enemies(SerialNumber).PlaceVal = -1 THEN
    IF ItemType$ <> "X" THEN
      IF ItemType$ = "$" THEN ItemNo = ItemNo + 1:  ELSE ItemType$ = "$": ItemNo = 1
      Enemies(SerialNumber).PlaceVal = 0
    END IF
  END IF
 
  IF Enemies(SerialNumber).PlaceVal = -11 THEN
   
    SELECT CASE EMove$
    CASE UP$
      Enemies(SerialNumber).x = PortalBeta.x * 10
      Enemies(SerialNumber).y = (PortalBeta.y * 10) - 10
    CASE DN$, ""
      Enemies(SerialNumber).x = PortalBeta.x * 10
      Enemies(SerialNumber).y = (PortalBeta.y * 10) + 10
    CASE RGT$
      Enemies(SerialNumber).x = (PortalBeta.x * 10) + 10
      Enemies(SerialNumber).y = PortalBeta.y * 10
    CASE LFT$
      Enemies(SerialNumber).x = (PortalBeta.x * 10) - 10
      Enemies(SerialNumber).y = PortalBeta.y * 10
    END SELECT
 
  END IF

  IF Enemies(SerialNumber).PlaceVal = -12 THEN
  
    SELECT CASE EMove$
    CASE UP$
      Enemies(SerialNumber).x = PortalAlpha.x * 10
      Enemies(SerialNumber).y = (PortalAlpha.y * 10) - 10
    CASE DN$
      Enemies(SerialNumber).x = PortalAlpha.x * 10
      Enemies(SerialNumber).y = (PortalAlpha.y * 10) + 10
    CASE ""
      Enemies(SerialNumber).x = PortalAlpha.x * 10
      Enemies(SerialNumber).y = (PortalAlpha.y * 10) + 10
    CASE RGT$
      Enemies(SerialNumber).x = (PortalAlpha.x * 10) + 10
      Enemies(SerialNumber).y = PortalAlpha.y * 10
    CASE LFT$
      Enemies(SerialNumber).x = (PortalAlpha.x * 10) - 10
      Enemies(SerialNumber).y = PortalAlpha.y * 10
    END SELECT
  END IF

  IF Guy.ScreenX = Enemies(SerialNumber).ScreenX AND Guy.ScreenY = Enemies(SerialNumber).ScreenY THEN
    IF Guy.Mvmnt = "DN" AND NOT Enemies(SerialNumber).NotBounce THEN
      ETrueDamage = ZeroLimit(INT(Guy.AP / Enemies(SerialNumber).DP))
      Enemies(SerialNumber).Health = ZeroLimit(Enemies(SerialNumber).Health - ETrueDamage)
      IF ETrueDamage > 0 THEN
        SharedWiseMessage$ = "YEAH!"
        SharedTalk = 10
      END IF
      Guy.y = Guy.y - 10
      Guy.Mvmnt = "UP"
      MID$(Guy.Direc, 1) = "U"
      Guy.JTime = 35
    ELSE
      GTrueDamage = ZeroLimit(INT(Enemies(SerialNumber).AP / Guy.DP))
      Guy.Health = ZeroLimit(Guy.Health - GTrueDamage)
      IF GTrueDamage > 0 THEN
        SharedWiseMessage$ = "OUCH!"
        SharedTalk = 10
      END IF
      SELECT CASE RIGHT$(Enemies(SerialNumber).Direc, 1)
      CASE "L"
        Guy.x = Guy.x - 5
        Enemies(SerialNumber).x = Enemies(SerialNumber).x + 5
      CASE "R"
        Guy.x = Guy.x + 5
        Enemies(SerialNumber).x = Enemies(SerialNumber).x - 5
      END SELECT
    END IF
  END IF

  IF Guy.Health <= 0 THEN GameOver
 
  IF Enemies(SerialNumber).Health <= 0 THEN
    Enemies(SerialNumber).Status = "GONE"
    SELECT CASE ItemType$
    CASE ""
      Guy.Health = Guy.Health + ItemNo
      IF Guy.Health > Guy.MaxHp THEN Guy.Health = Guy.MaxHp
    CASE "$"
      Coins = Coins + ItemNo
    END SELECT
    ScreenMap%(Enemies(SerialNumber).PlaceHold.x, Enemies(SerialNumber).PlaceHold.y) = Enemies(SerialNumber).PlaceVal
    Enemies(SerialNumber) = NoOneTemplate
  END IF
 
  Enemies(SerialNumber).Item = ItemType$ + STR$(ItemNo)
   
  SELECT CASE Enemies(SerialNumber).Race
  CASE "GOBLIN    ": DrawObj Goblinimage%(), 9, 9, Enemies(SerialNumber).x, Enemies(SerialNumber).y, Enemies(SerialNumber).Direc
  CASE "DRAGON    ": DrawObj Dragonimage%(), 9, 9, Enemies(SerialNumber).x, Enemies(SerialNumber).y, Enemies(SerialNumber).Direc
  CASE "RAVEN     ": DrawObj Ravenimage%(), 9, 9, Enemies(SerialNumber).x, Enemies(SerialNumber).y, Enemies(SerialNumber).Direc
  CASE "WSTATUE   ": DrawObj WingedStatueimage%(), 9, 9, Enemies(SerialNumber).x, Enemies(SerialNumber).y, Enemies(SerialNumber).Direc
  CASE "SNAKE     ": DrawObj Snakeimage%(), 9, 9, Enemies(SerialNumber).x, Enemies(SerialNumber).y, Enemies(SerialNumber).Direc
  CASE "STORMY    ": DrawObj Stormyimage%(), 9, 9, Enemies(SerialNumber).x, Enemies(SerialNumber).y, Enemies(SerialNumber).Direc
  CASE "GHOST     ": DrawObj Ghostimage%(), 9, 9, Enemies(SerialNumber).x, Enemies(SerialNumber).y, Enemies(SerialNumber).Direc
  CASE "LIGHTNING ": DrawObj Lightningimage%(), 9, 9, Enemies(SerialNumber).x, Enemies(SerialNumber).y, Enemies(SerialNumber).Direc
  CASE "FIRE      ": DrawObj Fireimage%(), 9, 9, Enemies(SerialNumber).x, Enemies(SerialNumber).y, Enemies(SerialNumber).Direc
  END SELECT
 
END SUB

FUNCTION DetermineCoin (LeScreenMap%())
  CoinMax = 0
  FOR x0 = 0 TO 31
    FOR y0 = 0 TO 19
      IF LeScreenMap%(x0, y0) = -1 THEN CoinMax = CoinMax + 1
    NEXT y0
  NEXT x0
  DetermineCoin = CoinMax
END FUNCTION

SUB Directions
  CLS
  COLOR 15
  PRINT "The object of the game is to get the key into the keyhole."
  PRINT "Watch out for false and hidden platforms and get coins."
  PRINT "To restart a level, press Ctrl+R."
  PRINT "To jump, press the up arrow. Press right and left to walk right and left."
  PRINT "To go through doors, press down. Use the number pad's arrow keys."
  PRINT "The Num Lock does not have to be on. Press <Space> to talk to people."
  PRINT "Good luck!"
  PRINT "(Press <Esc>.)"
  PCOPY 0, 1
  WHILE INKEY$ <> ESC$
  WEND
END SUB

SUB DrawObj (Image() AS INTEGER, xlimit AS INTEGER, ylimit AS INTEGER, x AS INTEGER, y AS INTEGER, position$)

FOR yp = 0 TO ylimit
  FOR xp = 0 TO xlimit
    SELECT CASE position$
    CASE "UR": pixel = Image%(xp, yp)
    CASE "UL": pixel = Image%(-xp + xlimit, yp)
    CASE "DL": pixel = Image%(xp, -yp + ylimit)
    CASE "DR": pixel = Image%(-xp + xlimit, -yp + ylimit)
    CASE "VL": pixel = Image%(-yp + ylimit, -xp + xlimit)
    CASE "VR": pixel = Image%(-yp + ylimit, xp)
    CASE "HR": pixel = Image%(yp, -xp + xlimit)
    CASE "HL": pixel = Image%(yp, xp)
    END SELECT
    IF pixel = -2 THEN pixel = POINT(xp + x, yp + y) + 1
    IF pixel = 16 THEN pixel = 0
    IF pixel <> -1 THEN PSET (xp + x, yp + y), pixel
  NEXT xp
NEXT yp

END SUB

FUNCTION FlipBlocks% (block%)
SELECT CASE block%
CASE -4: FlipBlocks% = 4
CASE 4: FlipBlocks% = -4
CASE ELSE: FlipBlocks% = block%
END SELECT
END FUNCTION

SUB Game
  Guy.Health = 10
  Guy.MaxHp = 10
  Guy.AP = 2
  Guy.DP = 1
  Guy.x = 160
  Guy.y = 99
  Guy.Mvmnt = "DN"
  Guy.JTime = 25
  Guy.Direc = "UR"
  Guy.Status = "GOOD"

1
IF WorldsChecked >= NoOfLevels THEN Warp = 0: WorldsChecked = 0
 
  PlayLevel ScreenMap1%(), "LEVEL 1 Beware of Lonely Coins", ""
  PlayLevel ScreenMap2%(), "LEVEL 2 Keys are Immortal", ""
  PlayLevel ScreenMap3%(), "LEVEL 3 Leaping Lions Distrust Green", ""
  PlayLevel ScreenMap4%(), "LEVEL 4 Eyes are Wiser than Coins", ""
  PlayLevel ScreenMap5%(), "LEVEL 5 What Goes Down Must Come Up", ""
  PlayLevel ScreenMap6%(), "LEVEL 6 The Bottomless Pit", ""
  PlayLevel ScreenMap7%(), "LEVEL 7 Goblins Eat Coins", ""
  PlayLevel ScreenMap8%(), "LEVEL 8 The Impossible Box", ""
 
  IF ADMISSION = 1 THEN
    PlayLevel BonusLevel%(), "BONUS LEVEL!!!", ""
    ADMISSION = 0
  END IF
 
  PlayLevel ScreenMap9%(), "LEVEL 9 Strangers Give Good Advice", ""
  PlayLevel ScreenMap10%(), "LEVEL 10 Statues Never Die or Kill", ""
  PlayLevel ScreenMap11%(), "LEVEL 11 Just Wait", ""

IF Guy.Status = "GONE" THEN GOTO 2
IF Warp = 1 THEN GOTO 1

COLOR 15
PRINT " YOU WINZ! Until I makes another level.  Press <Esc>."
PCOPY 0, 1
DO
LOOP WHILE INKEY$ <> ESC$
2 SCREEN 9, 0, 0, 1
  ON KEY(11) GOSUB MenuUp
  ON KEY(14) GOSUB MenuDown
  KEY(11) ON
  KEY(14) ON

END SUB

SUB GameOver
  DIM x AS INTEGER, y AS INTEGER, a AS INTEGER, B AS INTEGER

  x = 170
  y = 100
  a = 150
  B = 100
 
  OUT &H3C8, 0
  OUT &H3C9, 13
  OUT &H3C9, 13
  OUT &H3C9, 63

  DO
  
    RANDOMIZE TIMER
   
    CLS

    CIRCLE (100, 55), 4, 15
      PAINT (100, 55), 15, 15
    CIRCLE (10, 155), 8, 15
      PAINT (10, 155), 15, 15
    CIRCLE (300, 30), 5, 15
      PAINT (300, 30), 15, 15
    CIRCLE (105, 100), 10, 15
      PAINT (105, 100), 15, 15
    CIRCLE (270, 110), 15, 15
      PAINT (270, 110), 15, 15
    CIRCLE (195, 70), 13, 15
      PAINT (195, 70), 15, 15
    CIRCLE (160, 180), 20, 15
      PAINT (160, 180), 15, 15

    COLOR 4
    PRINT "Sorry, you died. Press <Esc>."
    LOCATE 13, 13
    PRINT "GAME       OVER"

    DrawObj GuyImage%(), 10, 10, x, y, "UR"
    DrawObj Handimage%(), 3, 3, x - 2, y + 4, "UR"
    DrawObj Handimage%(), 3, 3, x + 9, y + 4, "UR"
    CIRCLE (x + 4, y - 1), 4, 14

    DrawObj GuyImage%(), 10, 10, a, B, "UL"
    DrawObj Handimage%(), 3, 3, a - 2, B + 4, "UR"
    DrawObj Handimage%(), 3, 3, a + 9, B + 4, "UR"
    CIRCLE (a + 5, B - 1), 4, 14

    PCOPY 0, 1
  
    xDirecY = INT(RND * 3)
    aDirecB = INT(RND * 3)
  
    SELECT CASE xDirecY              'random directions
      CASE 0: x = x + 5
      CASE 1: x = x - 5
      CASE 2: y = y - 5
    END SELECT

    SELECT CASE aDirecB
      CASE 0: a = a + 5
      CASE 1: a = a - 5
      CASE 2: B = B - 5
    END SELECT
  
    IF a > XMAX THEN a = 0           'world-wrap
    IF a < 0 THEN a = XMAX
    IF B < 0 THEN B = YMAX: GoneUp = GoneUp + 1

    IF x > XMAX THEN x = 0
    IF x < 0 THEN x = XMAX
    IF y < 0 THEN y = YMAX: GoneUp = GoneUp + 1

    IF INKEY$ = ESC$ THEN
      Guy.Status = "GONE"
      FOR SerialNumber = 1 TO 10
        Enemies(SerialNumber).Status = "GONE"
      NEXT
      EXIT SUB
    END IF

    LOOP WHILE GoneUp < 20
    x = 0
    y = YMAX / 2
    DIM Ex AS INTEGER
    DIM Ey AS INTEGER
    Ex = -10
    Ey = YMAX / 2
    DIM HisDirec AS STRING * 2
    HisDirec = "UR"
    COMMANDSTRING1$ = "RRRRRRRRRRRRRRRRRRRRRRRRRR        LLLL    R  L UUDD LL"
    COMMANDSTRING2$ = "RRRRRRRRR   UDHUDHUDH UUUUUUDDDDDDDDDDDDDDDDDDDDDDDDDX"
    COMMANDSTRING$ = COMMANDSTRING1$ + COMMANDSTRING2$
    ECMMANDSTRING1$ = "RRRRRRRRRRRRRRRRRRRRRRRRRR   DDDD LLLL UUUR  LD     LL"
    ECMMANDSTRING2$ = "RRRRRRRRR   LL   UURRR             UDUDUDUDUDUDUDUDUD "
    ECMMANDSTRING$ = ECMMANDSTRING1$ + ECMMANDSTRING2$
    DO
      IF Place < LEN(COMMANDSTRING$) THEN Place = Place + 1
      CLS
      LOCATE 1, 15: COLOR 4: PRINT "EPIC FAIL"
      IF MID$(COMMANDSTRING$, Place, 1) = "H" THEN
        LOCATE 12, 15: PRINT "HELP!!!"
      END IF
      DrawObj GuyImage%(), 10, 10, x, y, HisDirec
      DrawObj Goblinimage%(), 9, 9, Ex, Ey, "UR"
      IF LEFT$(HisDirec, 1) = "U" OR LEFT$(HisDirec, 1) = "D" THEN
        DrawObj Handimage%(), 3, 3, x - 2, y + 4, "UR"
        DrawObj Handimage%(), 3, 3, x + 9, y + 4, "UR"
      ELSE
        DrawObj Handimage%(), 3, 3, x + 4, y - 2, "UR"
        DrawObj Handimage%(), 3, 3, x + 4, y + 9, "UR"
      END IF
     
      IF y <= (YMAX / 2) + 10 THEN
        CIRCLE (x + 4, y - 1), 4, 14
      ELSE
        CIRCLE (x, (YMAX / 2) + 10), 4, 14
      END IF

      DrawObj LCloudimage%(), 9, 9, 0, (YMAX / 2) + 10, "UR"
      FOR x0 = 9 TO XMAX - 19 STEP 10
        DrawObj MCloudimage%(), 9, 9, INT(x0), (YMAX / 2) + 10, "UR"
      NEXT x0
      DrawObj RCloudimage%(), 9, 9, XMAX - 11, (YMAX / 2) + 10, "UR"
     
      PCOPY 0, 1

      
      SELECT CASE MID$(COMMANDSTRING$, Place, 1)
      CASE "R"
        x = x + 5
        MID$(HisDirec, 2, 1) = "R"
      CASE "L"
        x = x - 5
        MID$(HisDirec, 2, 1) = "L"
      CASE "U"
        y = y - 5
        MID$(HisDirec, 1, 1) = "U"
      CASE "D"
        y = y + 5
        HisDirec = Spin$(HisDirec)
      CASE " "
        MID$(HisDirec, 1, 1) = "U"
      CASE "X"
        EXIT DO
      END SELECT
     
      SELECT CASE MID$(ECMMANDSTRING$, Place, 1)
      CASE "R"
        Ex = Ex + 5
      CASE "L"
        Ex = Ex - 5
      CASE "U"
        Ey = Ey - 5
      CASE "D"
        Ey = Ey + 5
      END SELECT
     
      IF INKEY$ = ESC$ THEN
        Guy.Status = "GONE"
        FOR SerialNumber = 1 TO 10
          Enemies(SerialNumber).Status = "GONE"
        NEXT
        EXIT SUB
      END IF

    LOOP
Guy.Status = "GONE"
FOR SerialNumber = 1 TO 10
  Enemies(SerialNumber).Status = "GONE"
NEXT

END SUB

SUB Jump (SerialNumber, Move$, ScreenMap%())
'STATIC NJTimer
'IF Move$ <> UP$ AND Guy(SerialNumber).Mvmnt = "UP" THEN NJTimer = NJTimer + 1:  ELSE NJTimer = 0
'
'IF Move$ = UP$ AND Guy(SerialNumber).JTime > 0 AND Guy(SerialNumber).Mvmnt <> "DN" AND Guy(SerialNumber).Mvmnt <> "XX" THEN
'  IF Guy(SerialNumber).y > 10 THEN
'  IF ScreenMap%(Guy(SerialNumber).ScreenX, Guy(SerialNumber).ScreenY - 1) <= 0 THEN Guy(SerialNumber).y = Guy(SerialNumber).y - 5
'  END IF
'  Guy(SerialNumber).Mvmnt = "UP"
'END IF
'
'IF (NJTimer >= 10 AND Guy(SerialNumber).Mvmnt = "UP") OR (Guy(SerialNumber).Mvmnt = "UP" AND Guy(SerialNumber).JTime = 0) THEN
'  Guy(SerialNumber).Mvmnt = "DN"
'END IF
'
' IF Guy(SerialNumber).Mvmnt = "DN" THEN
'  SELECT CASE Guy(SerialNumber).Direc
'    CASE "UR"
'      Guy(SerialNumber).Direc = "HR"
'    CASE "UL"
'      Guy(SerialNumber).Direc = "HL"
'    CASE "HR"
'      Guy(SerialNumber).Direc = "DR"
'    CASE "HL"
'      Guy(SerialNumber).Direc = "DL"
'    CASE "DR"
'      Guy(SerialNumber).Direc = "VR"
'    CASE "DL"
'      Guy(SerialNumber).Direc = "VL"
'    CASE "VR"
'      Guy(SerialNumber).Direc = "UR"
'    CASE "VL"
'      Guy(SerialNumber).Direc = "UL"
'    END SELECT
'END IF
'
'
'IF Guy(SerialNumber).Mvmnt <> "UP" AND Guy(SerialNumber).Mvmnt <> "XX" THEN
'  IF ScreenMap%(Guy(SerialNumber).ScreenX, Guy(SerialNumber).ScreenY + 1) <= 0 THEN
'    Guy(SerialNumber).y = Guy(SerialNumber).y + 5
'    Guy(SerialNumber).Mvmnt = "DN"
'    ELSE : Guy(SerialNumber).JTime = 25
'    Guy(SerialNumber).Mvmnt = "DX"
'   
'  IF LEFT$(Guy(SerialNumber).Direc, 1) = "R" OR RIGHT$(Guy(SerialNumber).Direc, 1) = "R" THEN Guy(SerialNumber).Direc = "UR"
'  IF LEFT$(Guy(SerialNumber).Direc, 1) = "L" OR RIGHT$(Guy(SerialNumber).Direc, 1) = "L" THEN Guy(SerialNumber).Direc = "UL"
'   
'  END IF
'END IF
'
'
'IF Guy(SerialNumber).Mvmnt = "UP" AND Guy(SerialNumber).JTime > 0 THEN
'  Guy(SerialNumber).JTime = Guy(SerialNumber).JTime - 5
'END IF
'IF Guy(SerialNumber).JTime < 0 THEN
'  Guy(SerialNumber).JTime = Guy(SerialNumber).JTime + 1
'END IF
'
'IF Guy(SerialNumber).ScreenY <> (Guy(SerialNumber).y + 1) / 10 AND ScreenMap%(Guy(SerialNumber).ScreenX, Guy(SerialNumber).ScreenY + 1) > 0 AND Guy(SerialNumber).Mvmnt <> "UP" THEN Guy(SerialNumber).y = Guy(SerialNumber).y - 5
'
END SUB

SUB LBInfo (Choice$)
CLS
PRINT "Use Keys F1-F10 to make platforms, keys, keyholes and coins."
PRINT "Use [ and ] to make portals. I and i make eyes."
PRINT "Use a and l to make LevelUps. Use 1-9 to make enemies."
PRINT "Press the Spacebar to add the object."
PRINT "Press Shift+S to play level, then Ctrl+S to"
PRINT "save a level, and F12 to load a level."
PRINT "Press BackSpace to delete all of the level info."
PRINT "Currently selected:"; Choice$
SLEEP
END SUB

SUB LevelBuilder
SCREEN 12
  FOR x0 = 0 TO 31
    FOR y0 = 0 TO 19
      ScreenMap%(x0, y0) = 0
    NEXT y0
  NEXT x0
  CLS
  PRINT "Select a template."
  PRINT "(0) Blank level"
  PRINT "(1) Level w/ Floor"
  PRINT "(2) Build off of other level"
  INPUT "Which one"; Template
  SELECT CASE Template
  CASE 1
    FOR x0 = 0 TO 31
      ScreenMap%(x0, 19) = 1
    NEXT x0
  CASE 2
    INPUT "File Name"; FileName$
    FileName$ = UCASE$(FileName$)
    IF RIGHT$(FileName$, 4) <> ".LVL" THEN FileName$ = FileName$ + ".LVL"
    OPEN "C:/BASIC/GAME/CUSTOM~1/" + FileName$ FOR RANDOM AS #1 LEN = LEN(ScreenMap%)
      RecordNumber = 1
      FOR x0 = 0 TO 31
        FOR y0 = 0 TO 19
          GET #1, RecordNumber, ScreenMap%(x0, y0)
          IF ScreenMap%(x0, y0) = -1 THEN CoinMax = CoinMax + 1
          RecordNumber = RecordNumber + 1
        NEXT y0
      NEXT x0
    CLOSE #1
  END SELECT

SCREEN 7, 0, 0, 1
  KEY(16) OFF
  CoinMax = 0
  ScreenX = 15
  ScreenY = 9
  Choice$ = "Platform"
  Choice = 1
  GDirec$ = "UR"

  DO
    CLS

    Move$ = INKEY$
    SELECT CASE Move$
      CASE RGT$: ScreenX = ScreenX + 1: GDirec$ = "UR"
      CASE LFT$: ScreenX = ScreenX - 1: GDirec$ = "UL"
      CASE UP$: ScreenY = ScreenY - 1
      CASE DN$: ScreenY = ScreenY + 1
      CASE CHR$(8)
      FOR x0 = 0 TO 31
        FOR y0 = 0 TO 19
          ScreenMap%(x0, y0) = 0
        NEXT y0
      NEXT x0
      CASE "i": Choice$ = "Sealed Eye": Choice = 3
      CASE "I": Choice$ = "Eye": Choice = -10
      CASE "[": Choice$ = "Portal �": Choice = -11
      CASE "]": Choice$ = "Portal �": Choice = -12
      CASE "1": Choice$ = "Goblin": Choice = 11
      CASE "2": Choice$ = "Raven": Choice = 12
      CASE "3": Choice$ = "Dragon": Choice = 13
      CASE "4": Choice$ = "Winged Statue": Choice = 14
      CASE "5": Choice$ = "Snake": Choice = 15
      CASE "6": Choice$ = "Stormy": Choice = 16
      CASE "7": Choice$ = "Ghost": Choice = 17
      CASE "w": Choice$ = "Wiseman": Choice = 22
      CASE "l": Choice$ = "LifeUp!": Choice = -13
      CASE "a": Choice$ = "AttackUp!": Choice = -14
      CASE "+": Choice$ = "Positive Block": Choice = 4
      CASE "-": Choice$ = "Negative Block": Choice = -4
      CASE F1$: Choice$ = "Platform": Choice = 1
      CASE F2$: Choice$ = "Sealed Platform": Choice = -5
      CASE F3$: Choice$ = "False Platform": Choice = -9
      CASE F4$: Choice$ = "Hidden Platform": Choice = 2
      CASE F5$: Choice$ = "Key": Choice = -20
      CASE F6$: Choice$ = "Sealed Key": Choice = -2
      CASE F7$: Choice$ = "Keyhole": Choice = -3
      CASE F8$: Choice$ = "Sealed Keyhole": Choice = -6
      CASE F9$: Choice$ = "Coin": Choice = -1
      CASE F10$:  Choice$ = "Delete": Choice = 0
      CASE "S"
        FOR y0 = 0 TO 19
          FOR x0 = 0 TO 31
            IF ScreenMap%(x0, y0) = -3 OR ScreenMap%(x0, y0) = -20 OR ScreenMap%(x0, y0) = -6 OR ScreenMap%(x0, y0) = -2 THEN
              Req = Req + 1
            END IF
            IF ScreenMap%(x0, y0) = -1 THEN CoinMax = CoinMax + 1
          NEXT x0
        NEXT y0
        IF Req < 2 THEN
          PRINT "Need keyhole and key."
          CoinMax = 0
          PCOPY 0, 1
          SLEEP
        ELSE
          Guy.x = TrueX
          Guy.y = TrueY
          Coins = 0
          PlayLevel ScreenMap%(), "CUSTOM LEVEL", ""
          Req = 0
        END IF
      CASE F11$
       
      CASE ESC$: EXIT DO
      CASE SPC$
        FOR y0 = 0 TO 19
          FOR x0 = 0 TO 31
            IF (Choice$ = "Key" OR Choice$ = "Sealed Key") AND (ScreenMap%(x0, y0) = -20 OR ScreenMap%(x0, y0) = -2) THEN ScreenMap%(x0, y0) = 0
            IF (Choice$ = "Keyhole" OR Choice$ = "Sealed Keyhole") AND (ScreenMap%(x0, y0) = -6 OR ScreenMap%(x0, y0) = -3) THEN ScreenMap%(x0, y0) = 0
            IF Choice = -11 AND ScreenMap%(x0, y0) = -11 THEN ScreenMap%(x0, y0) = 0
            IF Choice = -12 AND ScreenMap%(x0, y0) = -12 THEN ScreenMap%(x0, y0) = 0
          NEXT x0
        NEXT y0
        ScreenMap%(ScreenX, ScreenY) = Choice
    END SELECT

    IF Move$ = ENTR$ THEN
      EnterCount = EnterCount + 1
    ELSE
      EnterCount = 0
    END IF
    IF EnterCount >= 3 THEN LBInfo Choice$

    IF ScreenX > 31 THEN ScreenX = 0
    IF ScreenX < 0 THEN ScreenX = 31
    IF ScreenY > 19 THEN ScreenY = 0
    IF ScreenY < 0 THEN ScreenY = 19
   
    TrueX = ScreenX * 10
    TrueY = (ScreenY * 10) - 1
   
    PRINT Choice$
   
    FOR y0 = 0 TO 19
      FOR x0 = 0 TO 31
        SELECT CASE ScreenMap%(x0, y0)
        CASE 1: LINE (x0 * 10, y0 * 10)-((x0 * 10) + 10, (y0 * 10) + 15), 2, BF
        CASE 2: LINE (x0 * 10, y0 * 10)-((x0 * 10) + 10, (y0 * 10) + 15), 2, B
        CASE 4: LINE (x0 * 10, y0 * 10)-((x0 * 10) + 10, (y0 * 10) + 15), 1, BF
        CASE -4: LINE (x0 * 10, y0 * 10)-((x0 * 10) + 10, (y0 * 10) + 15), 4, BF
        CASE -9: LINE (x0 * 10, y0 * 10)-((x0 * 10) + 10, (y0 * 10) + 15), 4, B
        CASE -5: LINE (x0 * 10, y0 * 10)-((x0 * 10) + 10, (y0 * 10) + 15), 1, B
        CASE -1
          CIRCLE ((x0 * 10) + 5, (y0 * 10) + 5), 5, 6
          PAINT ((x0 * 10) + 5, (y0 * 10) + 5), 14, 6
        CASE -3: DrawObj Keyholeimage%(), 9, 9, x0 * 10, y0 * 10, "UR"
        CASE -6: DrawObj Keyholeimage%(), 9, 9, x0 * 10, y0 * 10, "DL"
        CASE -20: DrawObj Keyimage%(), 9, 9, x0 * 10, y0 * 10, "UR"
        CASE IS > 20
          DrawObj GuyImage%(), 10, 10, x0 * 10, y0 * 10, "UR"
          DrawObj Handimage%(), 3, 3, (x0 * 10) - 2, (y0 * 10) + 4, "UR"
          DrawObj Handimage%(), 3, 3, (x0 * 10) + 9, (y0 * 10) + 4, "UR"
        CASE -2: DrawObj Keyimage%(), 9, 9, x0 * 10, y0 * 10, "DL"
        CASE -10: DrawObj Eyeimage%(), 9, 9, x0 * 10, y0 * 10, "UR"
        CASE 3: DrawObj Eyeimage%(), 9, 9, x0 * 10, y0 * 10, "VR"
        CASE -11: DrawObj Portalimage%(), 9, 9, x0 * 10, y0 * 10, "UR"
        CASE -12: DrawObj Portalimage%(), 9, 9, x0 * 10, y0 * 10, "UR"
        CASE 11: DrawObj Goblinimage%(), 9, 9, x0 * 10, y0 * 10, "UR"
        CASE 12: DrawObj Ravenimage%(), 19, 19, x0 * 10, y0 * 10, "UR"
        CASE 13: DrawObj Dragonimage%(), 19, 19, x0 * 10, y0 * 10, "UR"
        CASE 14: DrawObj WingedStatueimage%(), 19, 19, x0 * 10, y0 * 10, "UR"
        CASE 15: DrawObj Snakeimage%(), 19, 19, x0 * 10, y0 * 10, "UR"
        CASE 16: DrawObj Stormyimage%(), 19, 19, x0 * 10, y0 * 10, "UR"
        CASE 17: DrawObj Ghostimage%(), 19, 19, x0 * 10, y0 * 10, "UR"
        CASE -13: DrawObj LifeUpimage%(), 19, 19, x0 * 10, y0 * 10, "UR"
        CASE -14: DrawObj AttackUpimage%(), 19, 19, x0 * 10, y0 * 10, "UR"
        END SELECT
      NEXT x0
    NEXT y0
   
    DrawObj GuyImage%(), 10, 10, INT(TrueX), INT(TrueY), GDirec$
    DrawObj Handimage%(), 3, 3, TrueX - 2, TrueY + 4, "UR"
    DrawObj Handimage%(), 3, 3, TrueX + 9, TrueY + 4, "UR"
   
    PCOPY 0, 1
  LOOP
  SCREEN 9, 0, 0, 1
  ON KEY(11) GOSUB MenuUp
  ON KEY(14) GOSUB MenuDown
  KEY(11) ON
  KEY(14) ON
  KEY(16) ON
END SUB

SUB MainMenu
Opt1 = 8
Opt2 = 8
Opt3 = 8
Opt4 = 8
GlovePos = 200

DO
  SCREEN 9, 0, 0, 1
  ON KEY(11) GOSUB MenuUp
  ON KEY(14) GOSUB MenuDown
  KEY(11) ON
  KEY(14) ON
 
  Move$ = INKEY$
  SELECT CASE Move$
  CASE ENTR$
    IF Choice = 1 THEN KEY(11) OFF: KEY(14) OFF: Game
    IF Choice = 2 THEN Directions
    IF Choice = 3 THEN LevelBuilder
    IF Choice = 4 THEN
      GOSUB Load
        ON KEY(11) GOSUB MenuUp
        ON KEY(14) GOSUB MenuDown
        KEY(11) ON
        KEY(14) ON
        SCREEN 9, 0, 0, 1
    END IF
    IF Choice = 5 THEN END
    IF Choice = 6 THEN RecordDemo
  END SELECT
  IF GlovePos > 199 AND GlovePos < 210 THEN Choice = 1
  IF GlovePos > 220 AND GlovePos < 230 THEN Choice = 2
  IF GlovePos > 250 AND GlovePos < 260 THEN Choice = 3
  IF GlovePos > 280 AND GlovePos < 290 THEN Choice = 4
  IF GlovePos > 300 AND GlovePos < 310 THEN Choice = 5
  IF GlovePos > 320 AND GlovePos < 330 THEN Choice = 6
  SELECT CASE Choice
  CASE 1: Opt1 = 15: Opt2 = 8: Opt3 = 8: Opt4 = 8: Opt5 = 8: Opt6 = 8
  CASE 2: Opt1 = 8: Opt2 = 15: Opt3 = 8: Opt4 = 8: Opt5 = 8: Opt6 = 8
  CASE 3: Opt1 = 8: Opt2 = 8: Opt3 = 15: Opt4 = 8: Opt5 = 8: Opt6 = 8
  CASE 4: Opt1 = 8: Opt2 = 8: Opt3 = 8: Opt4 = 15: Opt5 = 8: Opt6 = 8
  CASE 5: Opt1 = 8: Opt2 = 8: Opt3 = 8: Opt4 = 8: Opt5 = 15: Opt6 = 8
  CASE 6: Opt1 = 8: Opt2 = 8: Opt3 = 8: Opt4 = 8: Opt5 = 8: Opt6 = 15
  END SELECT
  CLS
  COLOR 15
  PRINT "�����������        ��          ���       ���    ���������"
  PRINT "��                ����         ����     ����    ��"
  PRINT "��               ��  ��        �� ��   �� ��    ��"
  PRINT "��              ��    ��      ��  ��� ���  ��   ��������"
  PRINT "��     ����    ����������     ��   �� ��   ��   ��"
  PRINT "��       ��   ���      ���   ��     ���     ��  ��"
  PRINT "��       ��  ���        ���  ��      �      ��  ��"
  PRINT "�����������  ��          ��  ��             ��  ���������.BAS "
  PRINT
  PRINT
  PRINT
  PRINT "By Christian Gorski"
  PRINT
  PRINT
  COLOR Opt1
  PRINT "   PLAY GAME"
  PRINT
  COLOR Opt2
  PRINT "   DIRECTIONS"
  PRINT
  COLOR Opt3
  PRINT "   GO TO LEVELBUILDER"
  PRINT
  COLOR Opt4
  PRINT "   LOAD CUSTOM LEVEL"
  PRINT
  COLOR Opt5
  PRINT "   QUIT"
  COLOR Opt6
  DrawObj Gloveimage%(), 12, 9, 5, GlovePos, "UR"
  PCOPY 0, 1
  DemoTimer = DemoTimer + 1
 
  IF DemoTimer = 400 THEN PlayDemo "DEMO2.DMO", ScreenMap2%()
  IF DemoTimer = 800 THEN PlayDemo "DEMO3.DMO", ScreenMap3%()
  IF DemoTimer = 1200 THEN PlayDemo "DEMO5.DMO", ScreenMap5%(): DemoTimer = 0

LOOP
Load:
        SCREEN 12
        INPUT "FileName"; FileName$
        SCREEN 9, 0, 0, 1
        Guy.x = 160
        Guy.y = 99
        Guy.Status = "GOOD"
        Guy.MaxHp = 10
        Guy.Health = 10
        Guy.Direc = "UR"
        Guy.AP = 2
        Guy.DP = 1
        CoinMax = 0
        FileName$ = UCASE$(FileName$)
        IF RIGHT$(FileName$, 4) <> ".LVL" THEN FileName$ = FileName$ + ".LVL"
        OPEN "C:/BASIC/GAME/CUSTOM~1/" + FileName$ FOR RANDOM AS #1 LEN = LEN(ScreenMap%)
          RecordNumber = 1
          FOR x0 = 0 TO 31
            FOR y0 = 0 TO 19
              GET #1, RecordNumber, ScreenMap%(x0, y0)
              IF ScreenMap%(x0, y0) = -1 THEN CoinMax = CoinMax + 1
              RecordNumber = RecordNumber + 1
            NEXT y0
          NEXT x0
        CLOSE #1
        PRINT "LOADED": PCOPY 0, 1
        SLEEP
        PlayLevel ScreenMap%(), "CUSTOM LEVEL", ""
        RETURN

END SUB

SUB Pause
  KEY(12) OFF
  KEY(13) OFF
  KEY(14) OFF
  KEY(11) OFF
  GuyX = 160
  GuyY = 100
  GDirec$ = "UR"
  DO
   
    CLS
   
    SELECT CASE INKEY$
      CASE RGT$: GuyX = GuyX + 5: GDirec$ = "UR"
      CASE LFT$: GuyX = GuyX - 5: GDirec$ = "UL"
      CASE UP$: GuyY = GuyY - 5
      CASE DN$: GuyY = GuyY + 5
      CASE SPC$
        IF Message$ = " Go to LevelBuilder." THEN BuildLevel = 1: EXIT DO
        IF Message$ = " Unpause w/ Spacebar." THEN EXIT DO
        IF GuyX >= Guy.x AND GuyX < Guy.x + 11 AND GuyY >= Guy.y AND GuyY < Guy.y + 11 THEN
           Warp$ = WhichWorld$(1)
        END IF
      CASE ENTR$
        IF Warp$ <> "" THEN
          Warp = 1
          World$ = Warp$
          EXIT DO
        END IF
    END SELECT
  
    IF GuyX > 30 AND GuyX < 70 AND GuyY > 90 AND GuyY < 130 THEN
      Message$ = " Unpause w/ Spacebar."
    ELSEIF GuyX > 270 AND GuyX < 310 AND GuyY > 90 AND GuyY < 130 THEN
      Message$ = " Go to LevelBuilder."
    ELSE
      Message$ = ""
    END IF
   
    IF GuyX >= Guy.x AND GuyX < Guy.x + 11 AND GuyY >= Guy.y AND GuyY < Guy.y + 11 THEN
      Message$ = Warp$
    END IF
   

    IF GuyX > XMAX THEN GuyX = 0
    IF GuyX < 0 THEN GuyX = XMAX
    IF GuyY > YMAX THEN GuyY = 0
    IF GuyY < 0 THEN GuyY = YMAX

    'draw all de crap

    COLOR 15
    PRINT "PAUSED"; Message$

    'boxes
    LINE (30, 90)-(70, 130), 3, BF
    LINE (270, 90)-(310, 130), 3, BF

    'guy
    DrawObj GuyImage%(), 10, 10, INT(GuyX), INT(GuyY), GDirec$
    DrawObj Handimage%(), 3, 3, GuyX - 2, GuyY + 4, "UR"
    DrawObj Handimage%(), 3, 3, GuyX + 9, GuyY + 4, "UR"
  
    'shift
    ShiftColor INT(Guy.x), INT(Guy.y), 11, 11
    PCOPY 0, 1
 
  LOOP
 
  KEY(12) ON
  KEY(13) ON
  KEY(14) ON
  KEY(11) ON

END SUB

SUB PlayDemo (FileName$, ScreenMap%())
  FileName$ = UCASE$(FileName$)
  IF RIGHT$(FileName$, 4) <> ".DMO" THEN FileName$ = FileName$ + ".DMO"
  SCREEN 7, 0, 0, 1
  
  OPEN "C:/BASIC/GAME/DEMOS/" + FileName$ FOR RANDOM AS #1 LEN = 210
    RecordNumber = 1
    FOR Time = 1 TO 200
      GET #1, RecordNumber, DemoGuy(Time)
      RecordNumber = RecordNumber + 1
    NEXT Time
  CLOSE #1
  Guy = DemoGuy(1)
  PlayLevel ScreenMap%(), "DEMO", "DEMO"
END SUB

SUB PlayLevel (LeScreenMap%(), Message$, Demo$)
SCREEN 7, 0, 0, 1
SharedMessage$ = Message$
YouShouldGo = 0
IF Guy.Status = "GONE" THEN EXIT SUB
IF LCASE$(Message$) = LCASE$(World$) THEN
  Warp = 0
  WorldsChecked = 0
ELSEIF Warp = 1 THEN
  WorldsChecked = WorldsChecked + 1
END IF

ON KEY(13) GOSUB LevelRight
ON KEY(12) GOSUB LevelLeft
ON KEY(11) GOSUB LevelJump
ON KEY(14) GOSUB Down
ON KEY(15) GOSUB Save
ON KEY(16) GOSUB Space
ON KEY(17) GOSUB Restart
DoorX = -1
DoorY = -1

Guy.Health = 10
IF Demo$ <> "DEMO" THEN
  KEY(15) ON
  KEY(16) ON
  KEY(17) ON
  KEY(11) ON 'up
  KEY(12) ON 'left
  KEY(13) ON 'right
  KEY(14) ON 'down
ELSE
  KEY(15) OFF
  KEY(16) OFF
  KEY(17) OFF
  KEY(11) OFF'up
  KEY(12) OFF'left
  KEY(13) OFF'right
  KEY(14) OFF'down
END IF
Coins = 0

FOR SerNo = 1 TO 10
  Enemies(SerNo).Status = "GONE"
NEXT SerNo

SerNo = 0

FOR y0 = 0 TO 19
  FOR x0 = 0 TO 31
    ScreenMap%(x0, y0) = LeScreenMap%(x0, y0)
    IF ScreenMap%(x0, y0) > 10 AND ScreenMap%(x0, y0) <= 20 AND SerNo < 15 THEN
      EnemyRace = ScreenMap%(x0, y0) - 10
      ScreenMap%(x0, y0) = 0
      SerNo = SerNo + 1
      SELECT CASE EnemyRace
      CASE 1
        Enemies(SerNo) = GoblinTemplate
      CASE 2
        Enemies(SerNo) = RavenTemplate
      CASE 3
        IF SerNo < 15 THEN
          Enemies(SerNo) = DragonTemplate
          Enemies(SerNo).x = x0 * 10
          Enemies(SerNo).y = y0 * 10
          SerNo = SerNo + 1
          Enemies(SerNo) = NoOneTemplate
        ELSE Enemies(SerNo) = NoOneTemplate
        END IF
      CASE 4
        Enemies(SerNo) = WingedStatueTemplate
      CASE 5
        Enemies(SerNo) = SnakeTemplate
      CASE 6
        IF SerNo < 15 THEN
          Enemies(SerNo) = StormyTemplate
          Enemies(SerNo).x = x0 * 10
          Enemies(SerNo).y = y0 * 10
          SerNo = SerNo + 1
          Enemies(SerNo) = NoOneTemplate
        ELSE Enemies(SerNo) = NoOneTemplate
        END IF
      CASE 7
        Enemies(SerNo) = GhostTemplate
      END SELECT
      Enemies(SerNo).x = x0 * 10
      Enemies(SerNo).y = y0 * 10
      Enemies(SerNo).PlaceHold.x = x0
      Enemies(SerNo).PlaceHold.y = y0
    END IF
  NEXT x0
NEXT y0

CoinMax = DetermineCoin(LeScreenMap%())
WiseMessage$ = ""
SharedWiseMessage$ = ""

FOR y0 = 0 TO 19
  FOR x0 = 0 TO 31
    IF ScreenMap%(x0, y0) = -11 THEN PortalAlpha.x = x0: PortalAlpha.y = y0
    IF ScreenMap%(x0, y0) = -12 THEN PortalBeta.x = x0: PortalBeta.y = y0
  NEXT x0
NEXT y0

Time = 0
'-----------------------------------------------------------------------------
DO
IF Warp = 1 THEN KEY(17) OFF: EXIT DO
IF Guy.Status = "GONE" THEN EXIT SUB
IF BuildLevel = 1 THEN
  BuildLevel = 0
  KEY(11) OFF
  KEY(12) OFF
  KEY(13) OFF
  KEY(14) OFF
  LevelBuilder
  KEY(11) ON
  KEY(12) ON
  KEY(13) ON
  KEY(14) ON
END IF
Talk = SharedTalk
WiseMessage$ = SharedWiseMessage$
CLS
PRINT " $"; Coins; CHR$(3); STR$(Guy.Health) + "/" + STR$(Guy.MaxHp); CHR$(6); Guy.AP; CHR$(5); Guy.DP
PRINT SharedMessage$

0 FOR y0 = 19 TO 0 STEP -1
  FOR x0 = 0 TO 31
    SELECT CASE ScreenMap%(x0, y0)
    CASE 1, 3
      LINE (x0 * 10, y0 * 10)-((x0 * 10) + 10, (y0 * 10) + 15), 2, BF
    CASE -9
      IF ScreenMap%(Guy.ScreenX, Guy.ScreenY) <> -10 THEN LINE (x0 * 10, y0 * 10)-((x0 * 10) + 10, (y0 * 10) + 15), 2, BF
    CASE 2
      IF ScreenMap%(Guy.ScreenX, Guy.ScreenY) = -10 THEN LINE (x0 * 10, y0 * 10)-((x0 * 10) + 10, (y0 * 10) + 15), 2, BF
    CASE 4
      LINE (x0 * 10, y0 * 10)-((x0 * 10) + 10, (y0 * 10) + 10), 1, BF
    CASE -4
      LINE (x0 * 10, y0 * 10)-((x0 * 10) + 10, (y0 * 10) + 10), 4, BF
    CASE -1
      CIRCLE ((x0 * 10) + 5, (y0 * 10) + 5), 5, 6
      PAINT ((x0 * 10) + 5, (y0 * 10) + 5), 14, 6
    CASE IS = -3
      DrawObj Keyholeimage%(), 9, 9, x0 * 10, y0 * 10, "UR"
    CASE -31
      ScreenMap%(x0, y0) = -11: ScreenMap%(PortalBeta.x, PortalBeta.y + 1) = ScreenMap%(PortalBeta.x, PortalBeta.y + 1) - 20
    CASE -32
      ScreenMap%(x0, y0) = -12: ScreenMap%(PortalAlpha.x, PortalAlpha.y + 1) = ScreenMap%(PortalAlpha.x, PortalAlpha.y + 1) - 20
   
    CASE IS <= -20
      DrawObj Keyimage%(), 9, 9, x0 * 10, y0 * 10, "UR"
      IF y0 < 19 THEN
        IF ScreenMap%(x0, y0 + 1) <= 0 THEN
          ScreenMap%(x0, y0 + 1) = ScreenMap%(x0, y0 + 1) - 20: ScreenMap%(x0, y0) = ScreenMap%(x0, y0) + 20
        END IF

      ELSEIF ScreenMap%(x0, 0) <= 0 THEN
        ScreenMap%(x0, y0) = ScreenMap%(x0, y0) + 20: ScreenMap%(x0, 0) = ScreenMap%(x0, 0) - 20
      END IF
  
    CASE -7: DoorX = x0 * 10: DoorY = y0 * 10
    CASE -10
      DrawObj Eyeimage%(), 9, 9, x0 * 10, y0 * 10, "UR"
    CASE -11, -12
      DrawObj Portalimage%(), 9, 9, x0 * 10, y0 * 10, "UR"
   
    CASE IS > 20
      IF x0 > Guy.ScreenX THEN WiseDirec$ = "UL"
      IF x0 < Guy.ScreenX THEN WiseDirec$ = "UR"
      DrawObj GuyImage%(), 10, 10, x0 * 10, (y0 * 10) - 1, WiseDirec$
      DrawObj Handimage%(), 3, 3, (x0 * 10) - 2, (y0 * 10) + 4, "UR"
      DrawObj Handimage%(), 3, 3, (x0 * 10) + 9, (y0 * 10) + 4, "UR"
    CASE -13
      DrawObj LifeUpimage%(), 19, 19, x0 * 10, y0 * 10, "UR"
    CASE -14
      DrawObj AttackUpimage%(), 19, 19, x0 * 10, y0 * 10, "UR"
    CASE -15
      'LINE (x0 * 10, y0 * 10)-((x0 * 10) + 10, (y0 * 10) + 10), 3, BF
      'anchor
    
    END SELECT
    IF ScreenMap%(x0, y0) = -23 THEN ScreenMap%(x0, y0) = -7
  NEXT x0
NEXT y0

IF DoorX > -1 AND DoorY > -1 THEN DrawObj Doorimage%(), 9, 9, INT(DoorX), INT(DoorY), "UR"
DrawObj GuyImage%(), 10, 10, INT(Guy.x), INT(Guy.y), Guy.Direc

IF LEFT$(Guy.Direc, 1) = "U" OR LEFT$(Guy.Direc, 1) = "D" THEN
  DrawObj Handimage%(), 3, 3, Guy.x - 2, Guy.y + 4, "UR"
  DrawObj Handimage%(), 3, 3, Guy.x + 9, Guy.y + 4, "UR"
ELSE
  DrawObj Handimage%(), 3, 3, Guy.x + 4, Guy.y - 2, "UR"
  DrawObj Handimage%(), 3, 3, Guy.x + 4, Guy.y + 9, "UR"
END IF

IF Time < 200 THEN
  IF Demo$ = "DEMO" THEN Time = Time + 1: Guy = DemoGuy(Time)
  IF Demo$ = "RECORD" THEN Time = Time + 1: DemoGuy(Time) = Guy
ELSEIF Demo$ = "RECORD" THEN SaveDemo: EXIT DO
ELSEIF Demo$ = "DEMO" THEN EXIT DO
END IF

IF ScreenMap%(Guy.ScreenX, Guy.ScreenY) = -1 THEN Coins = Coins + 1: ScreenMap%(Guy.ScreenX, Guy.ScreenY) = 0   'get coin

IF ScreenMap%(Guy.ScreenX, Guy.ScreenY) <= -20 AND Demo$ <> "" THEN
  ScreenMap%(Guy.ScreenX, Guy.ScreenY) = ScreenMap%(Guy.ScreenX, Guy.ScreenY) + 20
  SELECT CASE RIGHT$(Guy.Direc, 1)
  CASE "R"
    IF Guy.ScreenX < 31 THEN
      ScreenMap%(Guy.ScreenX + 1, Guy.ScreenY) = ScreenMap%(Guy.ScreenX + 1, Guy.ScreenY) - 20
    END IF
  CASE "L"
    IF Guy.ScreenX > 0 THEN
      ScreenMap%(Guy.ScreenX - 1, Guy.ScreenY) = ScreenMap%(Guy.ScreenX - 1, Guy.ScreenY) - 20
    END IF
  END SELECT
END IF

IF ScreenMap%(Guy.ScreenX, Guy.ScreenY) = -13 THEN Guy.MaxHp = Guy.MaxHp + 5: Guy.Health = Guy.MaxHp: ScreenMap%(Guy.ScreenX, Guy.ScreenY) = 0: SharedWiseMessage$ = "MAX HP +5!!!": SharedTalk = 50
IF ScreenMap%(Guy.ScreenX, Guy.ScreenY) = -14 THEN Guy.AP = Guy.AP + 3: ScreenMap%(Guy.ScreenX, Guy.ScreenY) = 0: SharedWiseMessage$ = "Attack +3!!!": SharedTalk = 50

IF ScreenMap%(Guy.ScreenX, Guy.ScreenY) = -11 THEN
  Guy.x = PortalBeta.x * 10
  Guy.y = (PortalBeta.y * 10) + 9
END IF
IF ScreenMap%(Guy.ScreenX, Guy.ScreenY) = -12 THEN
  Guy.x = PortalAlpha.x * 10
  Guy.y = (PortalAlpha.y * 10) + 9
END IF


Guy.ScreenX = INT(Guy.x / 10)
Guy.ScreenY = INT((Guy.y + 1) / 10)



'jump
IF Demo$ <> "DEMO" THEN
  IF Move$ <> UP$ AND Guy.Mvmnt = "UP" THEN NJTimer = NJTimer + 1:  ELSE NJTimer = 0

  IF (NJTimer >= 10 AND Guy.Mvmnt = "UP") OR (Guy.Mvmnt = "UP" AND Guy.JTime = 0) THEN
    Guy.Mvmnt = "DN"
  END IF

  IF Guy.Mvmnt = "DN" THEN
    Guy.Direc = Spin$(Guy.Direc)
  END IF
END IF

IF Guy.ScreenY > 18 THEN GameOver: EXIT SUB

FOR SerialNo = 1 TO SerNo
  AI SerialNo, ScreenMap%()
NEXT SerialNo

IF Demo$ <> "DEMO" THEN
  IF Guy.Mvmnt <> "UP" THEN
    IF ((Guy.y - 1) / 10) >= 19 THEN Guy.y = Guy.y - 10
    IF Guy.x / 10 >= 31 THEN Guy.x = Guy.x - 10
    IF ScreenMap%(Guy.ScreenX, Guy.ScreenY + 1) <= 0 AND ScreenMap%(INT((Guy.x + 5) / 10), Guy.ScreenY + 1) <= 0 THEN
      IF Guy.ScreenY = (Guy.y + 1) / 10 THEN
        Guy.y = Guy.y + 10
      ELSE
        Guy.y = Guy.y + 5
      END IF
      Guy.Mvmnt = "DN"
    ELSE : Guy.JTime = 25
      Guy.Mvmnt = "DX"
  
      IF RIGHT$(Guy.Direc, 1) = "R" THEN Guy.Direc = "UR"
      IF RIGHT$(Guy.Direc, 1) = "L" THEN Guy.Direc = "UL"
    END IF
  END IF


  IF Guy.Mvmnt = "UP" AND Guy.JTime > 0 THEN
    Guy.JTime = Guy.JTime - 5
  END IF
  IF Guy.JTime < 0 THEN
    Guy.JTime = Guy.JTime + 1
  END IF

  IF Guy.ScreenY <> (Guy.y + 1) / 10 AND ScreenMap%(Guy.ScreenX, Guy.ScreenY + 1) > 0 AND Guy.Mvmnt <> "UP" THEN Guy.y = Guy.y - 5
  
  IF INKEY$ = ENTR$ THEN
    KEY(16) OFF
    Pause           'pause
    KEY(16) ON
    ON KEY(13) GOSUB LevelRight
    ON KEY(12) GOSUB LevelLeft
    ON KEY(11) GOSUB LevelJump
    ON KEY(14) GOSUB Down
    ON KEY(15) GOSUB Save
      FOR x0 = 0 TO 31
        FOR y0 = 0 TO 19
          ScreenMap%(x0, y0) = LeScreenMap%(x0, y0)
        NEXT y0
      NEXT x0
  END IF
END IF
IF Coins = CoinMax THEN
  FOR y0 = 0 TO 19
    FOR x0 = 0 TO 31
      IF ScreenMap%(x0, y0) = -5 THEN ScreenMap%(x0, y0) = 1
      IF ScreenMap%(x0, y0) = -2 THEN ScreenMap%(x0, y0) = -20
      IF ScreenMap%(x0, y0) = -6 THEN ScreenMap%(x0, y0) = -3
      IF ScreenMap%(x0, y0) = 3 THEN ScreenMap%(x0, y0) = -10
    NEXT x0
  NEXT y0
  Coins = 0
END IF


IF Guy.y / 10 > 18 THEN GameOver: EXIT DO

IF YouShouldGo = 1 THEN EXIT DO

IF Talk > 0 THEN Talk = Talk - 1: SharedTalk = SharedTalk - 1: PRINT WiseMessage$
IF SharedTalk = 0 AND SharedWiseMessage$ = WiseMen(3).Speech THEN ADMISSION = 1: EXIT DO

IF INKEY$ = ESC$ THEN Guy.Status = "GONE": EXIT SUB        'quit 

PCOPY 0, 1
SOUND 0, 3 'anchor
LOOP
'-----------------------------------------------------------------------------
YouShouldGo = 0

END SUB

SUB RecordDemo
  SCREEN 12
  INPUT "FileName"; FileName$
  SCREEN 9, 0, 0, 1
  Guy.x = 160
  Guy.y = 99
  Guy.Status = "GOOD"
  Guy.MaxHp = 10
  Guy.Health = 10
  Guy.Direc = "UR"
  Guy.AP = 2
  Guy.DP = 1
  CoinMax = 0
  FileName$ = UCASE$(FileName$)
  IF RIGHT$(FileName$, 4) <> ".LVL" THEN FileName$ = FileName$ + ".LVL"
    OPEN "C:/BASIC/GAME/" + FileName$ FOR RANDOM AS #1 LEN = LEN(ScreenMap%)
      RecordNumber = 1
      FOR x0 = 0 TO 31
        FOR y0 = 0 TO 19
          GET #1, RecordNumber, ScreenMap%(x0, y0)
          IF ScreenMap%(x0, y0) = -1 THEN CoinMax = CoinMax + 1
          RecordNumber = RecordNumber + 1
        NEXT y0
      NEXT x0
    CLOSE #1
    PRINT "LOADED": PCOPY 0, 1
    SLEEP
    PlayLevel ScreenMap%(), "RECORDING", "RECORD"
    
END SUB

SUB SaveDemo
  SCREEN 12
  INPUT "Save Demo As"; FileName$
  FileName$ = UCASE$(FileName$)
  IF RIGHT$(FileName$, 4) <> ".DMO" THEN FileName$ = FileName$ + ".DMO"
  SCREEN 7, 0, 0, 1
  OPEN "C:/BASIC/GAME/DEMOS/" + FileName$ FOR RANDOM AS #1 LEN = 210
    RecordNumber = 1
    FOR Time = 1 TO 200
      PUT #1, RecordNumber, DemoGuy(Time)
      RecordNumber = RecordNumber + 1
    NEXT Time
  CLOSE #1
  
  PRINT "SAVED": PCOPY 0, 1
  SLEEP
       
END SUB

SUB ShiftColor (Startx, Starty, XLength, YLength)
FOR y0 = Starty TO Starty + YLength
  FOR x0 = Startx TO Startx + XLength
    pixel = POINT(x0, y0) + 1

    IF pixel = 16 THEN pixel = 0

    PSET (x0, y0), pixel
  NEXT x0
NEXT y0
END SUB

FUNCTION Spin$ (Direction AS STRING)
  LeftDirec$ = LEFT$(Direction, 1)
  SELECT CASE LeftDirec$
    CASE "U"
      LeftDirec$ = "H"
    CASE "H"
      LeftDirec$ = "D"
    CASE "D"
      LeftDirec$ = "V"
    CASE "V"
      LeftDirec$ = "U"
  END SELECT

  MID$(Direction, 1, 1) = LeftDirec$
  Spin = Direction
END FUNCTION

FUNCTION WhichWorld$ (blah)
SCREEN 9
CLS
COLOR 15
PRINT "SPEAK!"
INPUT World$
WhichWorld$ = World$
SCREEN 7, 0, 0, 1
END FUNCTION

FUNCTION ZeroLimit (Number AS INTEGER)
IF Number < 0 THEN Number = 0
ZeroLimit = Number
END FUNCTION
