/**
 * @license
 * Copyright 2022 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

// See:
// http://vintage-basic.net/games.html
// https://github.com/GReaperEx/bcg

foam.CLASS({
  package: 'foam.demos.basic',
  name: 'Programs',

  constants: {
    PROGRAMS: [
[ 'Empty', '' ],
[ 'Test', `
10 PRINT "HELLO"
20 PRINT 42
30 PRINT 1+2
40 PRINT TAB(10);"X"
50 PRINT TAB(1+2);"Y"
60 IF 1=1 THEN PRINT "TRUE"
70 IF 1=2 THEN PRINT "FALSE"
80 A=INT(9/2)
90 PRINT INT(9/2)
100 PRINT "DONE"
110 DATA 1,2,3
120 READ A,B,C
130 PRINT A;B;C
140 DIM X(10),Y(20,2),Z$(2,3,4)
150 PRINT "\\\///"
160 X(0)=1
170 X(1)=2
180 PRINT X(0)
190 PRINT X(1)
200 PRINT X(2)
210 X(0)=4:X(1)=5
220 PRINT X(0);X(1)
300 PRINT 2+3
310 PRINT 2*3
310 PRINT 2^3
320 PRINT 1+2^3+4
400 PRINT "X":PRINT "Y"
410 FOR I=1 TO 10: PRINT "X";: NEXT I
420 FOR I=1 TO 5: FOR J=1 TO I: PRINT "X";: NEXT J:PRINT: NEXT I
430 PRINT "FOO";"BAR"
440 PRINT "FOO";:PRINT "BAR"
1010 INPUT "question";a,b,c
1020 PRINT a;b;c
1030 PRINT a
1040 PRINT b
1050 PRINT c
2010 INPUT "question";a$,b$,c$
2020 PRINT a$;b$;c$
2030 PRINT a$
2040 PRINT b$
2050 PRINT c$
3000 V=30:PRINT INT(16*(V/32)^2+V^2/32+.5)
3010 PRINT 2^3
3020 PRINT V^3
3030 PRINT (1+2)/V^3
3040 PRINT 2+V^3
3050 PRINT V^3/2
3060 PRINT INT(V^3+2*3)
` ],
[ '3D Plot', `
1 PRINT TAB(32);"3D PLOT"
2 PRINT TAB(15);"CREATIVE COMPUTING  MORRISTOWN, NEW JERSEY"
3 PRINT:PRINT
5 DEF FNA(Z)=30*EXP(-Z*Z/100)
100 PRINT
110 FOR X=-30 TO 30 STEP 1.5
120 L=0
130 Y1=5*INT(SQR(900-X*X)/5)
140 FOR Y=Y1 TO -Y1 STEP -5
150 Z=INT(25+FNA(SQR(X*X+Y*Y))-.7*Y)
160 IF Z<=L THEN 190
170 L=Z
180 PRINT TAB(Z);"*";
190 NEXT Y
200 PRINT
210 NEXT X
300 END
`],

[ 'Sine Wave', `
10 PRINT TAB(30);"SINE WAVE"
20 PRINT TAB(15);"CREATIVE COMPUTING  MORRISTOWN, NEW JERSEY"
30 PRINT: PRINT: PRINT: PRINT: PRINT
40 REMARKABLE PROGRAM BY DAVID AHL
50 B=0
100 REM  START LONG LOOP
110 FOR T=0 TO 40 STEP .25
120 A=INT(26+25*SIN(T))
130 PRINT TAB(A);
140 IF B=1 THEN 180
150 PRINT "CREATIVE"
160 B=1
170 GOTO 200
180 PRINT "COMPUTING"
190 B=0
200 NEXT T
999 END
`],

[ 'Love', `
2 PRINT TAB(33);"LOVE"
4 PRINT TAB(15);"CREATIVE COMPUTING  MORRISTOWN, NEW JERSEY"
6 PRINT: PRINT: PRINT
20 PRINT "A TRIBUTE TO THE GREAT AMERICAN ARTIST, ROBERT INDIANA."
30 PRINT "HIS GREATEST WORK WILL BE REPRODUCED WITH A MESSAGE OF"
40 PRINT "YOUR CHOICE UP TO 60 CHARACTERS.  IF YOU CAN'T THINK OF"
50 PRINT "A MESSAGE, SIMPLE TYPE THE WORD 'LOVE'": PRINT
60 INPUT "YOUR MESSAGE, PLEASE";A$: L=LEN(A$)
70 DIM T$(120): FOR I=1 TO 10: PRINT: NEXT I
100 FOR J=0 TO INT(60/L)
110 FOR I=1 TO L
120 T$(J*L+I)=MID$(A$,I,1)
130 NEXT I: NEXT J
140 C=0
200 A1=1: P=1: C=C+1: IF C=37 THEN 999
205 PRINT
210 READ A: A1=A1+A: IF P=1 THEN 300
240 FOR I=1 TO A: PRINT " ";: NEXT I: P=1: GOTO 400
300 FOR I=A1-A TO A1-1: PRINT T$(I);: NEXT I: P=0
400 IF A1>60 THEN 200
410 GOTO 210
600 DATA 60,1,12,26,9,12,3,8,24,17,8,4,6,23,21,6,4,6,22,12,5,6,5
610 DATA 4,6,21,11,8,6,4,4,6,21,10,10,5,4,4,6,21,9,11,5,4
620 DATA 4,6,21,8,11,6,4,4,6,21,7,11,7,4,4,6,21,6,11,8,4
630 DATA 4,6,19,1,1,5,11,9,4,4,6,19,1,1,5,10,10,4,4,6,18,2,1,6,8,11,4
640 DATA 4,6,17,3,1,7,5,13,4,4,6,15,5,2,23,5,1,29,5,17,8
650 DATA 1,29,9,9,12,1,13,5,40,1,1,13,5,40,1,4,6,13,3,10,6,12,5,1
660 DATA 5,6,11,3,11,6,14,3,1,5,6,11,3,11,6,15,2,1
670 DATA 6,6,9,3,12,6,16,1,1,6,6,9,3,12,6,7,1,10
680 DATA 7,6,7,3,13,6,6,2,10,7,6,7,3,13,14,10,8,6,5,3,14,6,6,2,10
690 DATA 8,6,5,3,14,6,7,1,10,9,6,3,3,15,6,16,1,1
700 DATA 9,6,3,3,15,6,15,2,1,10,6,1,3,16,6,14,3,1,10,10,16,6,12,5,1
710 DATA 11,8,13,27,1,11,8,13,27,1,60
999 PRINT
`],

[ 'Kinema', `
10 PRINT TAB(33);"KINEMA"
20 PRINT TAB(15);"CREATIVE COMPUTING  MORRISTOWN, NEW JERSEY"
30 PRINT: PRINT: PRINT
100 PRINT
105 PRINT
106 Q=0
110 V=5+INT(35*RND(1))
111 PRINT "A BALL IS THROWN UPWARDS AT";V;"METERS PER SECOND."
112 PRINT
115 A=.05*V^2
116 PRINT "HOW HIGH WILL IT GO (IN METERS)";
117 GOSUB 500
120 A=V/5
122 PRINT "HOW LONG UNTIL IT RETURNS (IN SECONDS)";
124 GOSUB 500
130 T=1+INT(2*V*RND(1))/10
132 A=V-10*T
134 PRINT "WHAT WILL ITS VELOCITY BE AFTER";T;"SECONDS";
136 GOSUB 500
140 PRINT
150 PRINT Q;"RIGHT OUT OF 3.";
160 IF Q<2 THEN 100
170 PRINT "  NOT BAD."
180 GOTO 100
500 INPUT G
502 IF ABS((G-A)/A)<.15 THEN 510
504 PRINT "NOT EVEN CLOSE...."
506 GOTO 512
510 PRINT "CLOSE ENOUGH."
511 Q=Q+1
512 PRINT "CORRECT ANSWER IS ";A
520 PRINT
530 RETURN
999 END
`],

[ 'Poetry', `
10 PRINT TAB(30);"POETRY"
20 PRINT TAB(15);"CREATIVE COMPUTING  MORRISTOWN, NEW JERSEY"
30 PRINT:PRINT:PRINT
90 ON I GOTO 100,101,102,103,104
100 PRINT "MIDNIGHT DREARY";:GOTO 210
101 PRINT "FIERY EYES";:GOTO 210
102 PRINT "BIRD OR FIEND";:GOTO 210
103 PRINT "THING OF EVIL";:GOTO 210
104 PRINT "PROPHET";:GOTO 210
110 ON I GOTO 111,112,113,114,115
111 PRINT "BEGUILING ME";:U=2:GOTO 210
112 PRINT "THRILLED ME";:GOTO 210
113 PRINT "STILL SITTING....";:GOTO 212
114 PRINT "NEVER FLITTING";:U=2:GOTO 210
115 PRINT "BURNED";:GOTO 210
120 ON I GOTO 121,122,123,124,125
121 PRINT "AND MY SOUL";:GOTO 210
122 PRINT "DARKNESS THERE";:GOTO 210
123 PRINT "SHALL BE LIFTED";:GOTO 210
124 PRINT "QUOTH THE RAVEN";:GOTO 210
125 IF U=0 THEN 210
126 PRINT "SIGN OF PARTING";:GOTO 210
130 ON I GOTO 131,132,133,134,135
131 PRINT "NOTHING MORE";:GOTO 210
132 PRINT "YET AGAIN";:GOTO 210
133 PRINT "SLOWLY CREEPING";:GOTO 210
134 PRINT "...EVERMORE";:GOTO 210
135 PRINT "NEVERMORE";
210 IF U=0 OR RND(1)>.19 THEN 212
211 PRINT ",";:U=2
212 IF RND(1)>.65 THEN 214
213 PRINT " ";:U=U+1:GOTO 215
214 PRINT : U=0
215 I=INT(INT(10*RND(1))/2)+1
220 J=J+1 : K=K+1
230 IF U>0 OR INT(J/2)<>J/2 THEN 240
235 PRINT "     ";
240 ON J GOTO 90,110,120,130,250
250 J=0 : PRINT : IF K>20 THEN 999
260 GOTO 215
270 PRINT : U=0 : K=0 : GOTO 110
999 END
`],
[ 'Diamond', `
1 PRINT TAB(33);"DIAMOND"
2 PRINT TAB(15);"CREATIVE COMPUTING  MORRISTOWN, NEW JERSEY"
3 PRINT:PRINT:PRINT
4 PRINT "FOR A PRETTY DIAMOND PATTERN,"
5 INPUT "TYPE IN AN ODD NUMBER BETWEEN 5 AND 21";R:PRINT
6 Q=INT(60/R):A$="CC"
8 FOR L=1 TO Q
10 X=1:Y=R:Z=2
20 FOR N=X TO Y STEP Z
25 PRINT TAB((R-N)/2);
28 FOR M=1 TO Q
29 C=1
30 FOR A=1 TO N
32 IF C>LEN(A$) THEN PRINT "!";:GOTO 50
34 PRINT MID$(A$,C,1);
36 C=C+1
50 NEXT A
53 IF M=Q THEN 60
55 PRINT TAB(R*M+(R-N)/2);
56 NEXT M
60 PRINT
70 NEXT N
83 IF X<>1 THEN 95
85 X=R-2:Y=1:Z=-2
90 GOTO 20
95 NEXT L
99 END
` ],
[ 'Bunny',
`
10 PRINT TAB(33);"BUNNY"
20 PRINT TAB(15);"CREATIVE COMPUTING  MORRISTOWN, NEW JERSEY"
30 PRINT: PRINT: PRINT
100 REM  "BUNNY" FROM AHL'S 'BASIC COMPUTER GAMES'
110 DIM B(5)
120 FOR I=0 TO 4:READ B(I):NEXT I
130 GOSUB 260
140 L=64: REM  ASCII LETTER CODE...
150 REM
160 PRINT
170 READ X: IF X<0 THEN 160
175 IF X>128 THEN 240
180 PRINT TAB(X);: READ Y
190 FOR I=X TO Y: J=I-5*INT(I/5)
200 PRINT CHR$(L+B(J));
210 NEXT I
220 GOTO 170
230 REM
240 GOSUB 260: GOTO 450
250 REM
260 FOR I=1 TO 2: PRINT CHR$(10);: NEXT I
270 RETURN
280 REM
290 DATA 2,21,14,14,25
300 DATA 1,2,-1,0,2,45,50,-1,0,5,43,52,-1,0,7,41,52,-1
310 DATA 1,9,37,50,-1,2,11,36,50,-1,3,13,34,49,-1,4,14,32,48,-1
320 DATA 5,15,31,47,-1,6,16,30,45,-1,7,17,29,44,-1,8,19,28,43,-1
330 DATA 9,20,27,41,-1,10,21,26,40,-1,11,22,25,38,-1,12,22,24,36,-1
340 DATA 13,34,-1,14,33,-1,15,31,-1,17,29,-1,18,27,-1
350 DATA 19,26,-1,16,28,-1,13,30,-1,11,31,-1,10,32,-1
360 DATA 8,33,-1,7,34,-1,6,13,16,34,-1,5,12,16,35,-1
370 DATA 4,12,16,35,-1,3,12,15,35,-1,2,35,-1,1,35,-1
380 DATA 2,34,-1,3,34,-1,4,33,-1,6,33,-1,10,32,34,34,-1
390 DATA 14,17,19,25,28,31,35,35,-1,15,19,23,30,36,36,-1
400 DATA 14,18,21,21,24,30,37,37,-1,13,18,23,29,33,38,-1
410 DATA 12,29,31,33,-1,11,13,17,17,19,19,22,22,24,31,-1
420 DATA 10,11,17,18,22,22,24,24,29,29,-1
430 DATA 22,23,26,29,-1,27,29,-1,28,29,-1,4096
440 REM
450 END
` ],
[ 'Bounce',
`
10 PRINT TAB(33);"BOUNCE"
20 PRINT TAB(15);"CREATIVE COMPUTING  MORRISTOWN, NEW JERSEY"
30 PRINT:PRINT:PRINT
90 DIM T(20)
100 PRINT "THIS SIMULATION LETS YOU SPECIFY THE INITIAL VELOCITY"
110 PRINT "OF A BALL THROWN STRAIGHT UP, AND THE COEFFICIENT OF"
120 PRINT "ELASTICITY OF THE BALL.  PLEASE USE A DECIMAL FRACTION"
130 PRINT "COEFFICIENT (LESS THAN 1)."
131 PRINT
132 PRINT "YOU ALSO SPECIFY THE TIME INCREMENT TO BE USED IN"
133 PRINT "'STROBING' THE BALL'S FLIGHT (TRY .1 INITIALLY)."
134 PRINT
135 INPUT "TIME INCREMENT (SEC)";S2
140 PRINT
150 INPUT "VELOCITY (FPS)";V
160 PRINT
170 INPUT "COEFFICIENT";C
180 PRINT
182 PRINT "FEET"
184 PRINT
186 S1=INT(70/(V/(16*S2)))
190 FOR I=1 TO S1
200 T(I)=V*C^(I-1)/16
210 NEXT I
220 FOR H=INT(-16*(V/32)^2+V^2/32+.5) TO 0 STEP -.5
221 IF INT(H)<>H THEN 225
225 L=0
230 FOR I=1 TO S1
240 FOR TT=0 TO T(I) STEP S2
245 L=L+S2
250 IF ABS(H-(.5*(-32)*TT^2+V*C^(I-1)*TT))>.25 THEN 270
260 PRINT TAB(L/S2);"0";
270 NEXT TT
275 TT=T(I+1)/2
277 IF -16*TT^2+V*C^(I-1)*TT<H THEN 290
280 NEXT I
290 PRINT
300 NEXT H
310 PRINT TAB(1);
320 FOR I=1 TO INT(L+1)/S2+1
330 PRINT ".";
340 NEXT I
350 PRINT
355 PRINT " 0";
360 FOR I=1 TO INT(L+.9995)
380 PRINT TAB(INT(I/S2));I;
390 NEXT I
400 PRINT
410 PRINT TAB(INT(L+1)/(2*S2)-2);"SECONDS"
420 PRINT
430 GOTO 135
440 END
`],
[ 'Hangman',
`
10 PRINT TAB(32);"HANGMAN"
20 PRINT TAB(15);"CREATIVE COMPUTING  MORRISTOWN, NEW JERSEY"
25 PRINT:PRINT:PRINT
30 DIM P$(12,12),L$(20),D$(20),N$(26),U(50)
40 C=1: N=50
50 FOR I=1 TO 20: D$(I)="-": NEXT I: M=0
60 FOR I=1 TO 26: N$(I)="": NEXT I
70 FOR I=1 TO 12: FOR J=1 TO 12: P$(I,J)=" ": NEXT J: NEXT I
80 FOR I=1 TO 12: P$(I,1)="X": NEXT I
90 FOR I=1 TO 7: P$(1,I)="X": NEXT I: P$(2,7)="X"
95 IF C<N THEN 100
97 PRINT "YOU DID ALL THE WORDS!!": STOP
100 Q=INT(N*RND(1))+1
110 IF U(Q)=1 THEN 100
115 U(Q)=1: C=C+1: RESTORE: T1=0
150 FOR I=1 TO Q: READ A$: NEXT I
160 L=LEN(A$): FOR I=1 TO LEN(A$): L$(I)=MID$(A$,I,1): NEXT I
170 PRINT "HERE ARE THE LETTERS YOU USED:"
180 FOR I=1 TO 26: PRINT N$(I);: IF N$(I+1)="" THEN 200
190 PRINT ",";: NEXT I
200 PRINT: PRINT: FOR I=1 TO L: PRINT D$(I);: NEXT I: PRINT: PRINT
210 INPUT "WHAT IS YOUR GUESS? ";G$: R=0
220 FOR I=1 TO 26: IF N$(I)="" THEN 250
230 IF G$=N$(I) THEN PRINT "YOU GUESSED THAT LETTER BEFORE!": GOTO 170
240 NEXT I: PRINT "PROGRAM ERROR.  RUN AGAIN.": STOP
250 N$(I)=G$: T1=T1+1
260 FOR I=1 TO L: IF L$(I)=G$ THEN 280
270 NEXT I: IF R=0 THEN 290
275 GOTO 300
280 D$(I)=G$: R=R+1: GOTO 270
290 M=M+1: GOTO 400
300 FOR I=1 TO L: IF D$(I)="-" THEN 320
310 NEXT I: GOTO 390
320 PRINT: FOR I=1 TO L: PRINT D$(I);: NEXT I: PRINT: PRINT
330 INPUT "WHAT IS YOUR GUESS FOR THE WORD? ";B$
340 IF A$=B$ THEN 360
350 PRINT "WRONG.  TRY ANOTHER LETTER.": PRINT: GOTO 170
360 PRINT "RIGHT!!  IT TOOK YOU";T1;"GUESSES!"
370 INPUT "WANT ANOTHER WORD (YES|(NO))? ";W$: IF W$="YES" THEN 50
380 PRINT: PRINT "IT'S BEEN FUN!  BYE FOR NOW.": GOTO 999
390 PRINT "YOU FOUND THE WORD!": GOTO 370
400 PRINT: PRINT: PRINT"SORRY, THAT LETTER ISN'T IN THE WORD."
410 ON M GOTO 415,420,425,430,435,440,445,450,455,460
415 PRINT "FIRST, WE DRAW A HEAD": GOTO 470
420 PRINT "NOW WE DRAW A BODY.": GOTO 470
425 PRINT "NEXT WE DRAW AN ARM.": GOTO 470
430 PRINT "THIS TIME IT'S THE OTHER ARM.": GOTO 470
435 PRINT "NOW, LET'S DRAW THE RIGHT LEG.": GOTO 470
440 PRINT "THIS TIME WE DRAW THE LEFT LEG.": GOTO 470
445 PRINT "NOW WE PUT UP A HAND.": GOTO 470
450 PRINT "NEXT THE OTHER HAND.": GOTO 470
455 PRINT "NOW WE DRAW ONE FOOT": GOTO 470
460 PRINT "HERE'S THE OTHER FOOT -- YOU'RE HUNG!!"
470 ON M GOTO 480,490,500,510,520,530,540,550,560,570
480 P$(3,6)="-": P$(3,7)="-": P$(3,8)="-": P$(4,5)="(": P$(4,6)="."
481 P$(4,8)=".":P$(4,9)=")":P$(5,6)="-":P$(5,7)="-":P$(5,8)="-":GOTO 580
490 FOR I=6 TO 9: P$(I,7)="X": NEXT I: GOTO 580
500 FOR I=4 TO 7: P$(I,I-1)="\\": NEXT I: GOTO 580
510 P$(4,11)="/": P$(5,10)="/": P$(6,9)="/": P$(7,8)="/": GOTO 580
520 P$(10,6)="/": P$(11,5)="/": GOTO 580
530 P$(10,8)="\\": P$(11,9)="\\": GOTO 580
540 P$(3,11)="\\": GOTO 580
550 P$(3,3)="/": GOTO 580
560 P$(12,10)="\\": P$(12,11)="-": GOTO 580
570 P$(12,3)="-": P$(12,4)="/"
580 FOR I=1 TO 12: FOR J=1 TO 12: PRINT P$(I,J);: NEXT J
590 PRINT: NEXT I: PRINT: PRINT: IF M<>10 THEN 170
600 PRINT "SORRY, YOU LOSE.  THE WORD WAS ";A$
610 PRINT "YOU MISSED THAT ONE.  DO YOU ";: GOTO 370
620 INPUT "TYPE YES OR NO";Y$: IF LEFT$(Y$,1)="Y" THEN 50
700 DATA "GUM","SIN","FOR","CRY","LUG","BYE","FLY"
710 DATA "UGLY","EACH","FROM","WORK","TALK","WITH","SELF"
720 DATA "PIZZA","THING","FEIGN","FIEND","ELBOW","FAULT","DIRTY"
730 DATA "BUDGET","SPIRIT","QUAINT","MAIDEN","ESCORT","PICKAX"
740 DATA "EXAMPLE","TENSION","QUININE","KIDNEY","REPLICA","SLEEPER"
750 DATA "TRIANGLE","KANGAROO","MAHOGANY","SERGEANT","SEQUENCE"
760 DATA "MOUSTACHE","DANGEROUS","SCIENTIST","DIFFERENT","QUIESCENT"
770 DATA "MAGISTRATE","ERRONEOUSLY","LOUDSPEAKER","PHYTOTOXIC"
780 DATA "MATRIMONIAL","PARASYMPATHOMIMETIC","THIGMOTROPISM"
990 PRINT "BYE NOW"
999 END
`],
[ 'Guess',
`
1 PRINT TAB(33);"GUESS"
2 PRINT TAB(15);"CREATIVE COMPUTING  MORRISTOWN, NEW JERSEY"
3 PRINT:PRINT:PRINT
4 PRINT "THIS IS A NUMBER GUESSING GAME. I'LL THINK"
5 PRINT "OF A NUMBER BETWEEN 1 AND ANY LIMIT YOU WANT."
6 PRINT "THEN YOU HAVE TO GUESS WHAT IT IS."
7 PRINT
9 INPUT "WHAT LIMIT DO YOU WANT? ";L
10 PRINT
11 L1=INT(LOG(L)/LOG(2))+1
12 PRINT "I'M THINKING OF A NUMBER BETWEEN 1 AND ";L
13 G=1
14 PRINT "NOW YOU TRY TO GUESS WHAT IT IS."
15 M=INT(L*RND(1)+1)
20 INPUT "GUESS? ";N
21 IF N>0 THEN 25
22 GOSUB 70
23 GOTO 1
25 IF N=M THEN 50
30 G=G+1
31 IF N>M THEN 40
32 PRINT "TOO LOW. TRY A BIGGER ANSWER."
33 GOTO 20
40 PRINT "TOO HIGH. TRY A SMALLER ANSWER."
42 GOTO 20
50 PRINT "THAT'S IT! YOU GOT IT IN ";G;" TRIES."
52 IF G<L1 THEN 58
54 IF G=L1 THEN 60
56 PRINT "YOU SHOULD HAVE BEEN ABLE TO GET IT IN ONLY ";L1
57 GOTO 65
58 PRINT "VERY ";
60 PRINT "GOOD."
65 GOSUB 70
66 GOTO 12
70 FOR H=1 TO 5
71 PRINT
72 NEXT H
73 RETURN
99 END
`],
[ 'Calendar',
`
10 PRINT TAB(32);"CALENDAR"
20 PRINT TAB(15);"CREATIVE COMPUTING  MORRISTOWN, NEW JERSEY"
30 PRINT:PRINT:PRINT
100 REM     VALUES FOR 1979 - SEE NOTES
110 DIM M(12)
120 FOR I=1 TO 6: PRINT CHR$(10);: NEXT I
130 D=1: REM 1979 STARTS ON MONDAY (0=SUN, -1=MON, -2=TUES...)
140 S=0
150 REM     READ DAYS OF EACH MONTH
160 FOR N=0 TO 12: READ M(N): NEXT N
170 REM
180 FOR N=1 TO 12
190 PRINT: PRINT: S=S+M(N-1)
200 PRINT "**";S;TAB(7);
210 FOR I=1 TO 18: PRINT "*";: NEXT I
220 ON N GOTO 230,240,250,260,270,280,290,300,310,320,330,340
230 PRINT " JANUARY ";: GOTO 350
240 PRINT " FEBRUARY";: GOTO 350
250 PRINT "  MARCH  ";: GOTO 350
260 PRINT "  APRIL  ";: GOTO 350
270 PRINT "   MAY   ";: GOTO 350
280 PRINT "   JUNE  ";: GOTO 350
290 PRINT "   JULY  ";: GOTO 350
300 PRINT "  AUGUST ";: GOTO 350
310 PRINT "SEPTEMBER";: GOTO 350
320 PRINT " OCTOBER ";: GOTO 350
330 PRINT " NOVEMBER";: GOTO 350
340 PRINT " DECEMBER";
350 FOR I=1 TO 18: PRINT "*";: NEXT I
360 PRINT 365-S;"**";
370 REM   366-S;     ON LEAP YEARS
380 PRINT CHR$(10): PRINT "     S       M       T       W";
390 PRINT "       T       F       S"
400 PRINT
410 FOR I=1 TO 59: PRINT "*";: NEXT I
420 REM
430 FOR W=1 TO 6
440 PRINT CHR$(10)
450 PRINT TAB(4)
460 REM
470 FOR G=1 TO 7
480 D=D+1
490 D2=D-S
500 IF D2>M(N) THEN 580
510 IF D2>0 THEN PRINT D2;
520 PRINT TAB(4+8*G);
530 NEXT G
540 REM
550 IF D2=M(N) THEN 590
560 NEXT W
570 REM
580 D=D-G
590 NEXT N
600 REM
610 FOR I=1 TO 6: PRINT CHR$(10);: NEXT I
620 DATA 0,31,28,31,30,31,30,31,31,30,31,30,31
630 REM  0,31,29,  ..., ON LEAP YEARS
640 END
`],
[ 'Benchmark',
`
1 REM From https://www.youtube.com/watch?v=H05hM_Guoqk
2 REM https://docs.google.com/spreadsheets/d/1bfWSR2Ngy1RPedS6j-M607eeAhsd40-nhAfswILzzS8/edit#gid=1310743651
10 FOR I=1 TO 10
20 S=0
30 FOR J=1 TO 1000
40 S=S+J
50 NEXT J
60 PRINT ".";
70 NEXT I
80 PRINT S
`],
[ 'Buzzword',
`
10 PRINT TAB(26);"BUZZWORD GENERATOR"
20 PRINT TAB(15);"CREATIVE COMPUTING  MORRISTOWN, NEW JERSEY"
30 PRINT:PRINT:PRINT
40 PRINT "THIS PROGRAM PRINTS HIGHLY ACCEPTABLE PHRASES IN"
50 PRINT "'EDUCATOR-SPEAK' THAT YOU CAN WORK INTO REPORTS"
60 PRINT "AND SPEECHES.  WHENEVER A QUESTION MARK IS PRINTED,"
70 PRINT "TYPE A 'Y' FOR ANOTHER PHRASE OR 'N' TO QUIT."
80 PRINT:PRINT:PRINT "HERE'S THE FIRST PHRASE:"
90 DIM A$(40)
100 FOR I=1 TO 39 : READ A$(I) : NEXT I
110 PRINT A$(INT(13*RND(1)+1));" ";
120 PRINT A$(INT(13*RND(1)+14));" ";
130 PRINT A$(INT(13*RND(1)+27)) : PRINT
150 INPUT "Another (Y/N)? ";Y$ : IF Y$="Y" THEN 110
160 GOTO 999
200 DATA "ABILITY","BASAL","BEHAVIORAL","CHILD-CENTERED"
210 DATA "DIFFERENTIATED","DISCOVERY","FLEXIBLE","HETEROGENEOUS"
220 DATA "HOMOGENEOUS","MANIPULATIVE","MODULAR","TAVISTOCK"
230 DATA "INDIVIDUALIZED","LEARNING","EVALUATIVE","OBJECTIVE"
240 DATA "COGNITIVE","ENRICHMENT","SCHEDULING","HUMANISTIC"
250 DATA "INTEGRATED","NON-GRADED","TRAINING","VERTICAL AGE"
260 DATA "MOTIVATIONAL","CREATIVE","GROUPING","MODIFICATION"
270 DATA "ACCOUNTABILITY","PROCESS","CORE CURRICULUM","ALGORITHM"
280 DATA "PERFORMANCE","REINFORCEMENT","OPEN CLASSROOM","RESOURCE"
290 DATA "STRUCTURE","FACILITY","ENVIRONMENT"
999 PRINT "COME BACK WHEN YOU NEED HELP WITH ANOTHER REPORT!":END
`],
[ 'Gunner',
`
10 PRINT TAB(30);"GUNNER"
20 PRINT TAB(15);"CREATIVE COMPUTING  MORRISTOWN, NEW JERSEY"
30 PRINT:PRINT:PRINT
130 PRINT "YOU ARE THE OFFICER-IN-CHARGE, GIVING ORDERS TO A GUN"
140 PRINT "CREW, TELLING THEM THE DEGREES OF ELEVATION YOU ESTIMATE"
150 PRINT "WILL PLACE A PROJECTILE ON TARGET.  A HIT WITHIN 100 YARDS"
160 PRINT "OF THE TARGET WILL DESTROY IT." : PRINT
170 R=INT(40000*RND(1)+20000)
180 PRINT "MAXIMUM RANGE OF YOUR GUN IS";R;" YARDS."
185 Z=0
190 PRINT
195 S1=0
200 T=INT(R*(.1+.8*RND(1)))
210 S=0
220 GOTO 370
230 PRINT "MINIMUM ELEVATION IS ONE DEGREE."
240 GOTO 390
250 PRINT "MAXIMUM ELEVATION IS 89 DEGREES."
260 GOTO 390
270 PRINT "OVER TARGET BY ";ABS(E);"YARDS."
280 GOTO 390
290 PRINT "SHORT OF TARGET BY "ABS(E);"YARDS."
300 GOTO 390
320 PRINT "*** TARGET DESTROYED ***  ";S;"ROUNDS OF AMMUNITION EXPENDED."
325 S1=S1+S
330 IF Z=4 THEN 490
340 Z=Z+1
345 PRINT
350 PRINT "THE FORWARD OBSERVER HAS SIGHTED MORE ENEMY ACTIVITY..."
360 GOTO 200
370 PRINT "DISTANCE TO THE TARGET IS "T;" YARDS."
380 PRINT
390 PRINT
400 INPUT "ELEVATION";B
420 IF B>89 THEN 250
430 IF B<1 THEN 230
440 S=S+1
442 IF S<6 THEN 450
444 PRINT:PRINT "BOOM !!!!   YOU HAVE JUST BEEN DESTROYED ";
446 PRINT "BY THE ENEMY." : PRINT : PRINT : PRINT : GOTO 495
450 B2=2*B/57.3 : I=R*SIN(B2) : X=T-I : E=INT(X)
460 IF ABS(E)<100 THEN 320
470 IF E>100 THEN 290
480 GOTO 270
490 PRINT : PRINT : PRINT "TOTAL ROUNDS EXPENDED WERE:";S1
492 IF S1>18 THEN 495
493 PRINT "NICE SHOOTING !!" : GOTO 500
495 PRINT "BETTER GO BACK TO FORT SILL FOR REFRESHER TRAINING!"
500 PRINT : INPUT "TRY AGAIN (Y OR N)";Z$
510 IF Z$="Y" THEN 170
520 PRINT:PRINT "OK.  RETURN TO BASE CAMP."
999 END
`],
[ 'Banner',
`
5 DIM S(7),F(100),J(100)
10 INPUT "HORIZONTAL";X
20 INPUT "VERTICAL";Y
21 INPUT "CENTERED";L$
22 G1=0:IF L$>"P" THEN G1=1
23 INPUT "CHARACTER (TYPE 'ALL' IF YOU WANT CHARACTER BEING PRINTED)";M$
29 PRINT "STATEMENT";
30 INPUT A$
35 INPUT "SET PAGE";O$:PRINT
40 A=ASC(LEFT$(A$,1))
50 REM
60 REM
70 FOR T=1 TO LEN(A$)
80 P$=MID$(A$,T,1)
90 FOR O=1 TO 50
95 READ S$,S(1),S(2),S(3),S(4),S(5),S(6),S(7)
96 IF P$=" " THEN 812
100 IF P$=S$ THEN 200
120 NEXT O
200 RESTORE
201 X$=M$
202 IF M$="ALL" THEN X$=S$
205 FOR U=1 TO 7
210 FOR K=8 TO 0 STEP -1
230 IF 2^K<S(U) THEN 270
240 J(9-K)=0
250 GOTO 280
270 J(9-K)=1: S(U)=S(U)-2^K
272 IF S(U)=1 THEN 815
280 NEXT K
445 FOR T1=1 TO X
447 PRINT TAB((63-4.5*Y)*G1/(LEN(X$))+1);
450 FOR B=1 TO F(U)
460 IF J(B)=0 THEN 500
465 FOR I=1 TO Y: PRINT X$;: NEXT I
470 GOTO 600
500 FOR I=1 TO Y
510 FOR I1=1 TO LEN(X$)
520 PRINT " ";: NEXT I1
530 NEXT I
600 NEXT B
620 PRINT
630 NEXT T1
700 NEXT U
750 FOR H=1 TO 2*X: PRINT: NEXT H
800 NEXT T
806 FOR H=1 TO 75: PRINT: NEXT H
810 END
812 FOR H=1 TO 7*X: PRINT: NEXT H
813 GOTO 800
815 F(U)=9-K: GOTO 445
899 DATA " ",0,0,0,0,0,0,0
900 DATA "A",505,37,35,34,35,37,505
901 DATA "G",125,131,258,258,290,163,101
902 DATA "E",512,274,274,274,274,258,258
903 DATA "T",2,2,2,512,2,2,2
904 DATA "W",256,257,129,65,129,257,256
905 DATA "L",512,257,257,257,257,257,257
906 DATA "S",69,139,274,274,274,163,69
907 DATA "O",125,131,258,258,258,131,125
908 DATA "N",512,7,9,17,33,193,512
909 DATA "F",512,18,18,18,18,2,2
910 DATA "K",512,17,17,41,69,131,258
911 DATA "B",512,274,274,274,274,274,239
912 DATA "D",512,258,258,258,258,131,125
913 DATA "H",512,17,17,17,17,17,512
914 DATA "M",512,7,13,25,13,7,512
915 DATA "?",5,3,2,354,18,11,5
916 DATA "U",128,129,257,257,257,129,128
917 DATA "R",512,18,18,50,82,146,271
918 DATA "P",512,18,18,18,18,18,15
919 DATA "Q",125,131,258,258,322,131,381
920 DATA "Y",8,9,17,481,17,9,8
921 DATA "V",64,65,129,257,129,65,64
922 DATA "X",388,69,41,17,41,69,388
923 DATA "Z",386,322,290,274,266,262,260
924 DATA "I",258,258,258,512,258,258,258
925 DATA "C",125,131,258,258,258,131,69
926 DATA "J",65,129,257,257,257,129,128
927 DATA "1",0,0,261,259,512,257,257
928 DATA "2",261,387,322,290,274,267,261
929 DATA "*",69,41,17,512,17,41,69
930 DATA "3",66,130,258,274,266,150,100
931 DATA "4",33,49,41,37,35,512,33
932 DATA "5",160,274,274,274,274,274,226
933 DATA "6",194,291,293,297,305,289,193
934 DATA "7",258,130,66,34,18,10,8
935 DATA "8",69,171,274,274,274,171,69
936 DATA "9",263,138,74,42,26,10,7
937 DATA "=",41,41,41,41,41,41,41
938 DATA "!",1,1,1,384,1,1,1
939 DATA "0",57,69,131,258,131,69,57
940 DATA ".",1,1,129,449,129,1,1
1000 STOP
1002 END
`],
[ 'Amazing Maze',
`
10 PRINT TAB(28);"AMAZING PROGRAM"
20 PRINT TAB(15);"CREATIVE COMPUTING  MORRISTOWN, NEW JERSEY"
30 PRINT:PRINT:PRINT:PRINT
100 REM INPUT "WHAT ARE YOUR WIDTH AND LENGTH";H,V
101 H=12:V=12
102 IF H<>1 AND V<>1 THEN 110
104 PRINT "MEANINGLESS DIMENSIONS.  TRY AGAIN.":GOTO 100
110 DIM W(H,V),V(H,V)
120 PRINT
130 PRINT
140 PRINT
150 PRINT
160 Q=0:Z=0:X=INT(RND(1)*H+1)
165 FOR I=1 TO H
170 IF I=X THEN 173
171 PRINT ".--";:GOTO 180
173 PRINT ".  ";
180 NEXT I
190 PRINT "."
195 C=1:W(X,1)=C:C=C+1
200 R=X:S=1:GOTO 260
210 IF R<>H THEN 240
215 IF S<>V THEN 230
220 R=1:S=1:GOTO 250
230 R=1:S=S+1:GOTO 250
240 R=R+1
250 IF W(R,S)=0 THEN 210
260 IF R-1=0 THEN 530
265 IF W(R-1,S)<>0 THEN 530
270 IF S-1=0 THEN 390
280 IF W(R,S-1)<>0 THEN 390
290 IF R=H THEN 330
300 IF W(R+1,S)<>0 THEN 330
310 X=INT(RND(1)*3+1)
320 ON X GOTO 790,820,860
330 IF S<>V THEN 340
334 IF Z=1 THEN 370
338 Q=1:GOTO 350
340 IF W(R,S+1)<>0 THEN 370
350 X=INT(RND(1)*3+1)
360 ON X GOTO 790,820,910
370 X=INT(RND(1)*2+1)
380 ON X GOTO 790,820
390 IF R=H THEN 470
400 IF W(R+1,S)<>0 THEN 470
405 IF S<>V THEN 420
410 IF Z=1 THEN 450
415 Q=1:GOTO 430
420 IF W(R,S+1)<>0 THEN 450
430 X=INT(RND(1)*3+1)
440 ON X GOTO 790,860,910
450 X=INT(RND(1)*2+1)
460 ON X GOTO 790,860
470 IF S<>V THEN 490
480 IF Z=1 THEN 520
485 Q=1:GOTO 500
490 IF W(R,S+1)<>0 THEN 520
500 X=INT(RND(1)*2+1)
510 ON X GOTO 790,910
520 GOTO 790
530 IF S-1=0 THEN 670
540 IF W(R,S-1)<>0 THEN 670
545 IF R=H THEN 610
547 IF W(R+1,S)<>0 THEN 610
550 IF S<>V THEN 560
552 IF Z=1 THEN 590
554 Q=1:GOTO 570
560 IF W(R,S+1)<>0 THEN 590
570 X=INT(RND(1)*3+1)
580 ON X GOTO 820,860,910
590 X=INT(RND(1)*2+1)
600 ON X GOTO 820,860
610 IF S<>V THEN 630
620 IF Z=1 THEN 660
625 Q=1:GOTO 640
630 IF W(R,S+1)<>0 THEN 660
640 X=INT(RND(1)*2+1)
650 ON X GOTO 820,910
660 GOTO 820
670 IF R=H THEN 740
680 IF W(R+1,S)<>0 THEN 740
685 IF S<>V THEN 700
690 IF Z=1 THEN 730
695 Q=1:GOTO 830
700 IF W(R,S+1)<>0 THEN 730
710 X=INT(RND(1)*2+1)
720 ON X GOTO 860,910
730 GOTO 860
740 IF S<>V THEN 760
750 IF Z=1 THEN 780
755 Q=1:GOTO 770
760 IF W(R,S+1)<>0 THEN 780
770 GOTO 910
780 GOTO 1000
790 W(R-1,S)=C
800 C=C+1:V(R-1,S)=2:R=R-1
810 IF C=H*V+1 THEN 1010
815 Q=0:GOTO 260
820 W(R,S-1)=C
830 C=C+1
840 V(R,S-1)=1:S=S-1:IF C=H*V+1 THEN 1010
850 Q=0:GOTO 260
860 W(R+1,S)=C
870 C=C+1:IF V(R,S)=0 THEN 880
875 V(R,S)=3:GOTO 890
880 V(R,S)=2
890 R=R+1
900 IF C=H*V+1 THEN 1010
905 GOTO 530
910 IF Q=1 THEN 960
920 W(R,S+1)=C:C=C+1:IF V(R,S)=0 THEN 940
930 V(R,S)=3:GOTO 950
940 V(R,S)=1
950 S=S+1:IF C=H*V+1 THEN 1010
955 GOTO 260
960 Z=1
970 IF V(R,S)=0 THEN 980
975 V(R,S)=3:Q=0:GOTO 1000
980 V(R,S)=1:Q=0:R=1:S=1:GOTO 250
1000 GOTO 210
1010 FOR J=1 TO V
1011 PRINT "I";
1012 FOR I=1 TO H
1013 IF V(I,J)<2 THEN 1030
1020 PRINT "   ";
1021 GOTO 1040
1030 PRINT "  I";
1040 NEXT I
1041 PRINT
1043 FOR I=1 TO H
1045 IF V(I,J)=0 THEN 1060
1050 IF V(I,J)=2 THEN 1060
1051 PRINT ":  ";
1052 GOTO 1070
1060 PRINT ":--";
1070 NEXT I
1071 PRINT "."
1072 NEXT J
1073 END
`],
[ 'Hello',
`
2 PRINT TAB(33);"HELLO"
4 PRINT TAB(15);"CREATIVE COMPUTING  MORRISTOWN, NEW JERSEY"
6 PRINT: PRINT: PRINT
10 PRINT "HELLO.  MY NAME IS CREATIVE COMPUTER."
20 PRINT: PRINT: INPUT "WHAT'S YOUR NAME";N$: PRINT
30 PRINT "HI THERE, ";N$;", ARE YOU ENJOYING YOURSELF HERE";
40 INPUT B$: PRINT
50 IF B$="YES" THEN 70
55 IF B$="NO" THEN 80
60 PRINT N$;", I DON'T UNDERSTAND YOUR ANSWER OF '";B$;"'."
65 PRINT "PLEASE ANSWER 'YES' OR 'NO'.  DO YOU LIKE IT HERE";: GOTO 40
70 PRINT "I'M GLAD TO HEAR THAT, ";N$;".": PRINT
75 GOTO 100
80 PRINT "OH, I'M SORRY TO HEAR THAT, ";N$;". MAYBE WE CAN"
85 PRINT "BRIGHTEN UP YOUR VISIT A BIT."
100 PRINT
105 PRINT "SAY, ";N$;", I CAN SOLVE ALL KINDS OF PROBLEMS EXCEPT"
110 PRINT "THOSE DEALING WITH GREECE.  WHAT KIND OF PROBLEMS DO"
120 PRINT "YOU HAVE (ANSWER SEX, HEALTH, MONEY, OR JOB)";
125 INPUT C$
126 PRINT
130 IF C$="SEX" THEN 200
132 IF C$="HEALTH" THEN 180
134 IF C$="MONEY" THEN 160
136 IF C$="JOB" THEN 145
138 PRINT "OH, ";N$;", YOUR ANSWER OF ";C$;" IS GREEK TO ME."
140 GOTO 250
145 PRINT "I CAN SYMPATHIZE WITH YOU ";N$;".  I HAVE TO WORK"
148 PRINT "VERY LONG HOURS FOR NO PAY -- AND SOME OF MY BOSSES"
150 PRINT "REALLY BEAT ON MY KEYBOARD.  MY ADVICE TO YOU, ";N$;","
153 PRINT "IS TO OPEN A RETAIL COMPUTER STORE.  IT'S GREAT FUN."
155 GOTO 250
160 PRINT "SORRY, ";N$;", I'M BROKE TOO.  WHY DON'T YOU SELL"
162 PRINT "ENCYCLOPEADIAS OR MARRY SOMEONE RICH OR STOP EATING"
164 PRINT "SO YOU WON'T NEED SO MUCH MONEY?"
170 GOTO 250
180 PRINT "MY ADVICE TO YOU ";N$;" IS:"
185 PRINT "     1.  TAKE TWO ASPRIN"
188 PRINT "     2.  DRINK PLENTY OF FLUIDS (ORANGE JUICE, NOT BEER!)"
190 PRINT "     3.  GO TO BED (ALONE)"
195 GOTO 250
200 INPUT "IS YOUR PROBLEM TOO MUCH OR TOO LITTLE";D$: PRINT
210 IF D$="TOO MUCH" THEN 220
212 IF D$="TOO LITTLE" THEN 230
215 PRINT "DON'T GET ALL SHOOK, ";N$;", JUST ANSWER THE QUESTION"
217 INPUT "WITH 'TOO MUCH' OR 'TOO LITTLE'.  WHICH IS IT";D$:GOTO 210
220 PRINT "YOU CALL THAT A PROBLEM?!!  I SHOULD HAVE SUCH PROBLEMS!"
225 PRINT "IF IT BOTHERS YOU, ";N$;", TAKE A COLD SHOWER."
228 GOTO 250
230 PRINT "WHY ARE YOU HERE IN SUFFERN, ";N$;"?  YOU SHOULD BE"
235 PRINT "IN TOKYO OR NEW YORK OR AMSTERDAM OR SOMEPLACE WITH SOME"
240 PRINT "REAL ACTION."
250 PRINT
255 PRINT "ANY MORE PROBLEMS YOU WANT SOLVED, ";N$;
260 INPUT E$: PRINT
270 IF E$="YES" THEN 280
273 IF E$="NO" THEN 300
275 PRINT "JUST A SIMPLE 'YES' OR 'NO' PLEASE, ";N$;"."
277 GOTO 255
280 PRINT "WHAT KIND (SEX, MONEY, HEALTH, JOB)";
282 GOTO 125
300 PRINT
302 PRINT "THAT WILL BE $5.00 FOR THE ADVICE, ";N$;"."
305 PRINT "PLEASE LEAVE THE MONEY ON THE TERMINAL."
307 FOR I=1 TO 2000: NEXT I
310 PRINT: PRINT: PRINT
315 PRINT "DID YOU LEAVE THE MONEY";
320 INPUT G$: PRINT
325 IF G$="YES" THEN 350
330 IF G$="NO" THEN 370
335 PRINT "YOUR ANSWER OF '";G$;"' CONFUSES ME, ";N$;"."
340 PRINT "PLEASE RESPOND WITH 'YES' OR 'NO'.": GOTO 315
350 PRINT "HEY, ";N$;"??? YOU LEFT NO MONEY AT ALL!"
355 PRINT "YOU ARE CHEATING ME OUT OF MY HARD-EARNED LIVING."
360 PRINT:PRINT "WHAT A RIP OFF, ";N$;"!!!":PRINT
365 GOTO 385
370 PRINT "THAT'S HONEST, ";N$;", BUT HOW DO YOU EXPECT"
375 PRINT "ME TO GO ON WITH MY PSYCHOLOGY STUDIES IF MY PATIENTS"
380 PRINT "DON'T PAY THEIR BILLS?"
385 PRINT:PRINT "TAKE A WALK, ";N$;".":PRINT:PRINT:GOTO 999
390 PRINT "NICE MEETING YOU, ";N$;", HAVE A NICE DAY."
400 REM
999 END
`],
[ 'Weekkday',
`
10 PRINT TAB(32);"WEEKDAY"
20 PRINT TAB(15);"CREATIVE COMPUTING  MORRISTOWN, NEW JERSEY"
30 PRINT:PRINT:PRINT
100 PRINT "WEEKDAY IS A COMPUTER DEMONSTRATION THAT"
110 PRINT"GIVES FACTS ABOUT A DATE OF INTEREST TO YOU."
120 PRINT
130 PRINT "ENTER TODAY'S DATE IN THE FORM: 3,24,1979  ";
140 INPUT M1,D1,Y1
150 REM THIS PROGRAM DETERMINES THE DAY OF THE WEEK
160 REM  FOR A DATE AFTER 1582
170 DEF FNA(A)=INT(A/4)
180 DIM T(12)
190 DEF FNB(A)=INT(A/7)
200 REM SPACE OUTPUT AND READ IN INITIAL VALUES FOR MONTHS.
210 FOR I= 1 TO 12
220 READ T(I)
230 NEXT I
240 PRINT"ENTER DAY OF BIRTH (OR OTHER DAY OF INTEREST)";
250 INPUT M,D,Y
260 PRINT
270 LET I1 = INT((Y-1500)/100)
280 REM TEST FOR DATE BEFORE CURRENT CALENDAR.
290 IF Y-1582 <0 THEN 1300
300 LET A = I1*5+(I1+3)/4
310 LET I2=INT(A-FNB(A)*7)
320 LET Y2=INT(Y/100)
330 LET Y3 =INT(Y-Y2*100)
340 LET A =Y3/4+Y3+D+T(M)+I2
350 LET B=INT(A-FNB(A)*7)+1
360 IF M > 2 THEN 470
370 IF Y3 = 0 THEN 440
380 LET T1=INT(Y-FNA(Y)*4)
390 IF T1 <> 0 THEN 470
400 IF B<>0 THEN 420
410 LET B=6
420 LET B = B-1
430 GOTO 470
440 LET A = I1-1
450 LET T1=INT(A-FNA(A)*4)
460 IF T1 = 0 THEN 400
470 IF B <>0 THEN 490
480 LET B = 7
490 IF (Y1*12+M1)*31+D1<(Y*12+M)*31+D THEN 550
500 IF (Y1*12+M1)*31+D1=(Y*12+M)*31+D THEN 530
510 PRINT M;"/";D;"/";Y;" WAS A ";
520 GOTO 570
530 PRINT M;"/";D;"/";Y;" IS A ";
540 GOTO 570
550 PRINT M;"/";D;"/";Y;" WILL BE A ";
560 REM PRINT THE DAY OF THE WEEK THE DATE FALLS ON.
570 IF B <>1 THEN 590
580 PRINT "SUNDAY."
590 IF B<>2 THEN 610
600 PRINT "MONDAY."
610 IF B<>3 THEN 630
620 PRINT "TUESDAY."
630 IF B<>4 THEN 650
640 PRINT "WEDNESDAY."
650 IF B<>5 THEN 670
660 PRINT "THURSDAY."
670 IF B<>6 THEN 690
680 GOTO 1250
690 IF B<>7 THEN 710
700 PRINT "SATURDAY."
710 IF (Y1*12+M1)*31+D1=(Y*12+M)*31+D THEN 1120
720 LET I5=Y1-Y
730 PRINT
740 LET I6=M1-M
750 LET I7=D1-D
760 IF I7>=0 THEN 790
770 LET I6= I6-1
780 LET I7=I7+30
790 IF I6>=0 THEN 820
800 LET I5=I5-1
810 LET I6=I6+12
820 IF I5<0 THEN 1310
830 IF I7 <> 0 THEN 850
835 IF I6 <> 0 THEN 850
840 PRINT"***HAPPY BIRTHDAY***"
850 PRINT " "," ","YEARS","MONTHS","DAYS"
855 PRINT " "," ","-----","------","----"
860 PRINT "YOUR AGE (IF BIRTHDATE) ",I5,I6,I7
870 LET A8 = (I5*365)+(I6*30)+I7+INT(I6/2)
880 LET K5 = I5
890 LET K6 = I6
900 LET K7 = I7
910 REM CALCULATE RETIREMENT DATE.
920 LET E = Y+65
930 REM CALCULATE TIME SPENT IN THE FOLLOWING FUNCTIONS.
940 LET F = .35
950 PRINT "YOU HAVE SLEPT ",
960 GOSUB 1370
970 LET F = .17
980 PRINT "YOU HAVE EATEN ",
990 GOSUB 1370
1000 LET F = .23
1010 IF K5 > 3 THEN 1040
1020 PRINT "YOU HAVE PLAYED",
1030 GOTO 1080
1040 IF K5 > 9 THEN 1070
1050 PRINT "YOU HAVE PLAYED/STUDIED",
1060 GOTO  1080
1070 PRINT "YOU HAVE WORKED/PLAYED",
1080 GOSUB 1370
1085 GOTO 1530
1090 PRINT "YOU HAVE RELAXED ",K5,K6,K7
1100 PRINT
1110 PRINT TAB(16);"***  YOU MAY RETIRE IN";E;" ***"
1120 PRINT
1140 PRINT
1200 PRINT
1210 PRINT
1220 PRINT
1230 PRINT
1240 END
1250 IF D=13 THEN 1280
1260 PRINT "FRIDAY."
1270 GOTO 710
1280 PRINT "FRIDAY THE THIRTEENTH---BEWARE!"
1290 GOTO 710
1300 PRINT "NOT PREPARED TO GIVE DAY OF WEEK PRIOR TO MDLXXXII. "
1310 GOTO 1140
1320 REM TABLE OF VALUES FOR THE MONTHS TO BE USED IN CALCULATIONS.
1330 DATA 0, 3, 3, 6, 1, 4, 6, 2, 5, 0, 3, 5
1340 REM THIS IS THE CURRENT DATE USED IN THE CALCULATIONS.
1350 REM THIS IS THE DATE TO BE CALCULATED ON.
1360 REM CALCULATE TIME IN YEARS, MONTHS, AND DAYS
1370 LET K1=INT(F*A8)
1380 LET I5 = INT(K1/365)
1390 LET K1 = K1- (I5*365)
1400 LET I6 = INT(K1/30)
1410 LET I7 = K1 -(I6*30)
1420 LET K5 = K5-I5
1430 LET K6 =K6-I6
1440 LET K7 = K7-I7
1450 IF K7>=0 THEN 1480
1460 LET K7=K7+30
1470 LET K6=K6-1
1480 IF K6>0 THEN 1510
1490 LET K6=K6+12
1500 LET K5=K5-1
1510 PRINT I5,I6,I7
1520 RETURN
1530 IF K6=12 THEN 1550
1540 GOTO 1090
1550 LET K5=K5+1
1560 LET K6=0
1570 GOTO 1090
1580 REM
1590 END
`],
[ 'Mugwump',
`
1 PRINT TAB(33);"MUGWUMP"
2 PRINT TAB(15);"CREATIVE COMPUTING  MORRISTOWN, NEW JERSEY"
3 PRINT:PRINT:PRINT
4 REM     COURTESY PEOPLE'S COMPUTER COMPANY
10 DIM P(4,2)
20 PRINT "THE OBJECT OF THIS GAME IS TO FIND FOUR MUGWUMPS"
30 PRINT "HIDDEN ON A 10 BY 10 GRID.  HOMEBASE IS POSITION 0,0."
40 PRINT "ANY GUESS YOU MAKE MUST BE TWO NUMBERS WITH EACH"
50 PRINT "NUMBER BETWEEN 0 AND 9, INCLUSIVE.  FIRST NUMBER"
60 PRINT "IS DISTANCE TO RIGHT OF HOMEBASE AND SECOND NUMBER"
70 PRINT "IS DISTANCE ABOVE HOMEBASE."
80 PRINT
90 PRINT "YOU GET 10 TRIES.  AFTER EACH TRY, I WILL TELL"
100 PRINT "YOU HOW FAR YOU ARE FROM EACH MUGWUMP."
110 PRINT
240 GOSUB 1000
250 T=0
260 T=T+1
270 PRINT
275 PRINT
290 PRINT "TURN NO.";T;"-- WHAT IS YOUR GUESS";
300 INPUT M,N
310 FOR I=1 TO 4
320 IF P(I,1)=-1 THEN 400
330 IF P(I,1)<>M THEN 380
340 IF P(I,2)<>N THEN 380
350 P(I,1)=-1
360 PRINT "YOU HAVE FOUND MUGWUMP";I
370 GOTO 400
380 D=SQR((P(I,1)-M)^2+(P(I,2)-N)^2)
390 PRINT "YOU ARE";(INT(D*10))/10;"UNITS FROM MUGWUMP";I
400 NEXT I
410 FOR J=1 TO 4
420 IF P(J,1)<>-1 THEN 470
430 NEXT J
440 PRINT
450 PRINT "YOU GOT THEM ALL IN";T;"TURNS!"
460 GOTO 580
470 IF T<10 THEN 260
480 PRINT
490 PRINT "SORRY, THAT'S 10 TRIES.  HERE IS WHERE THEY'RE HIDING:"
540 FOR I=1 TO 4
550 IF P(I,1)=-1 THEN 570
560 PRINT "MUGWUMP";I;"IS AT (";P(I,1);",";P(I,2);")"
570 NEXT I
580 PRINT
600 PRINT "THAT WAS FUN! LET'S PLAY AGAIN......."
610 PRINT "FOUR MORE MUGWUMPS ARE NOW IN HIDING."
630 GOTO 240
1000 FOR J=1 TO 2
1010 FOR I=1 TO 4
1020 P(I,J)=INT(10*RND(1))
1030 NEXT I
1040 NEXT J
1050 RETURN
1099 END
`],
/*
[ '',
`
`],
*/
].map(e => [e[1], e[0]])}});
