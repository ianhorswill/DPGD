---
pagetitle: "Original design document from *Starflight*"
status: alpha
---
This and other design documents can be found [on github](https://github.com/tangentforks/starflight/blob/master/text.txt).
```text
Ambient Design     Proprietary                          4-1-84


                   TEXT OUTPUT SYNTAX DESIGN


INTRODUCTION:  This  document defines all of the formats in which 
text information is presented to the user.
 
I.  DEFINITION  FORMAT - the rules  for defining the  description 
templates   is   the  "regular  expression"  format  defined   in 
"Principals of Compiler Design" by Aho,Ullman where:

     L+  means one or more occurances of L

     L*  means zero or more occurances of L

     L#  where # is a digit, means 0-# occurances of L

     L:M means L OR M but not both

     L;M = (L:M):(L M)  {means L AND/OR M}

     Parentheses are used to group subexpressions

     An example of a regular expression is:
                 identifier = letter(letter|digit)*

     No  subexpression  is  used unless it  has  been  previously 
     defined.

     Ascii  characters are atomic expressions  (expressions  that 
     cannot be decomposed into subexpressions). 

     Literals are depicted within quotes.




















II. OVERVIEW  OF  DESCRIPTIONS  - see next section  for  detailed 
    syntax.

   A. EQUIPTMENT 
      1. NAME  - each piece of equiptment is named using one  of 
         two possible name formats:

         FUNCTIONAL-----><ethnic origin> function

         STRUCTURAL-----><ethnic origin>
                         <color> structural entity
      2. DESCRIPTION 

         a. VISUAL  - received  when the user selects  "EXAMINE"                    
            option.

         VISUAL--><relative size>
                  <color> <texture> structural entity <feature>

         b. FUNCTIONAL  - received  when the  user  successfully 
            analyzes  the function of a piece of equiptment  when 
            "USE"ing the "Function Analyzer".

            FUNCTIONAL--> phyla  class

         c.  USAGE  - received  when the user "USE"es a piece  of    
            equiptment.

           USAGE--><sound effect><visual effect><physical effect>

     3. MASS SCANNER DESCRIPTION - received when the user "USE"es 
        the "Mass Scanner" on anything.

        MASS SCANNER--->
              state <composition> volume mass weight

    4.  BIO  SCANNER  - received when the user "USE"es  the  "Bio 
        Scanner" on anything.

        BIO SCANNER---> <bio status>
                        <intelligence analog>
                        <agression analog>
                        <niche><edibility>

    5. LIFEFORM DESCRIPTION - received when either "LOOK"ing at a 
       visible lifeform icon OR when not in "LOOK" mode and there 
       is  a lifeform in your icon square OR when you  EXAMINE  a 
       lifeform. 







       a. VISUAL--> description set size 
                    extreme size/height/length 
                    <body proportion>  
                    <number of legs> 
                    <<symmetry>OR<simili>>
                    <color>
                    <texture>
                    <exterior type>
                    <height/length>
                    <movement feature>
                    <manipulative feature>
                    <weapon feature>
                    <decorative feature>
                    <carried items>

       b. AUDIO--> <volume><frequency><sound type>

       c. BEHAVIORAL--> <behavior> 

       d. BIO-STATUS--> <bio-status>         

    6. STARSHIP SENSOR DESCRIPTION--> 
        "gas"    <composition>
        "liquid" <composition>
        "solid"  <composition>

    7. SCIENCE OFFICER DESCRIPTIVE ANALYSIS (STARSHIP ONLY)
       a. OBJECT IDENTIFICATION---><star><planet>...
       b. STELLAR DESCRIPTION--->
                  spectral class
                  luminosity class
                  stability
                  bio-possibility
       c. PLANETARY DESCRIPTION---> 
                  planet class ( gas giant, desert planet)
                  surface gravity
                  atmospheric density
                  global weather
                  life readings   
                  technology level    
       d. ASTEROID DESCRIPTION--->
                  life readings
                  technology level
       e. VESSEL/PROBE/BOUY--->      
                  life readings
                  relative size
                  engine power
                  acceleration rate
                  sheild strength
       f. DEBRIS--->nothing





    8. PLANETARY  TERRAIN  (PLANETSIDE  ONLY) - received  as  the 
       default description when on planet surface;  overidden  by 
       any other description or conversation.
       a. SURFACE--->
                  (wild card)1                  
                  (texture)1                                
                  terrain type            
                  (mineral-phyla name)1 
   
       b. ATMOSPHERIC--->
                  temperature
                  humidity
                  weather activity
                  visibility   ( misty foggy clear )
                  <sky color>
                  <sun color(s)>


    9. DAMAGE  DESCRIPTION - received when select ENGINEER:DAMAGE 
       in the starship.
     
     DAMAGE---> damage       ( light, moderate, heavy, critical )
                estimated repair time  ( hours )

   10. CONSTRUCT  - received  when "LOOK"ing  or  "EXAMINE"ing  a 
       building icon on planet surface.

       CONSTRUCT---> set size            
                     size/height/length 
                     <proportion>  
                     <structure>
                     constuct type
                     (texture)1;(color)1
         pronoun " APPEAR" ("S")1 " TO BE MADE OF "
                     determiner <substance> and vtb
                     (about)(approx)
                     <height/length> (cm/m) (high/long)
        pronoun possesive  <functional feature>
                     <decorative feature>
                     <contained items>















III. DESCRIPTION SYNTAX EXPRESSIONS

letter = "A":"B":"C"..."Z"

digit  = "0":"1":"2"..."9"

determiner = "A":"AN"

vtb (verb to be) = "IS":"ARE"

pronoun = "THEY":"IT"

possessive = "HAVE":"HAS"


hue = "RED"|"GREEN":"GREENISH BROWN":.........(Appendix A)
tint = "DARK":"GREY":"LIGHT"..................(Appendix B)
luminosity = "BLINDING":"BRIGHT":.............(Appendix C)

color = luminosity:
        (luminosity " ")1 pure hue :
        (tint " ")1 pure hue:
        mixed hue


structural entity = "BOX":"CONE":"ORB"........(Appendix D)

relative size = "WEE":"TINY":...."TREMENDOUS".(Appendix E)

proportion = "FLATTENED":"WIDE"...............(Appendix F)

texture = "SHINY":"SMOOTH":"HORNY"............(Appendix G)

structure = "ROUND":"ROD-SHAPED":.............(Appendix H)

symmetry = "AMORPHOUS":"IRREGULAR":...........(Appendix I)
************* ADD CODE TO APPENDIX J & SORT ****************
simili = "PLANT-LIKE":"BALLOON-LIKE"..........(Appendix J)

ethnic origin = "HUMAN"|"ELOWAN"..."XSTYTHIAN"(Appendix K)

kingdom name = "FOOD":"EQUIPMENT":"CONSTRUCT":
               "LIFEFORM":"MINERAL":"CREW MEMBER"

equipment-phyla name = "WEAPON":"VEHICLE":....(Appendix L)
              
equipment-class name = "LASER":"MORTAR".......(Appendix M)

equipment functional name = 
                    (ethnic origin)1   
                    equipment-class name   

equipment structural name = (ethnic origin)1 
                            (color)1 
                            structural entity

set size = "1":"2":"3":......"9999"

rough set size = (determiner):"2":..."25":
                 "30":"35"..."50":
                 "50":"100":..."200"
                 "200+":"300+":..."900+"

equipment item name = equipment functional name:
                      equipment structural name
                      rough set size:set size

crew member name = user defined:user defined:....

meter size = "1":"1.5":"2":"2.5"...."10": 
             "15":"20":"25"..."100"

description set size = rough set size:"THOUSANDS OF":
                     "MILLIONS OF"

feature number = (determiner:"ONE"):"2"..."10":"MANY"

lifeform item name = simili:
                     feature number " LEGGED":
                     symmetry 
                     " LF " set size:rough set size
                    
mineral-phyla name = "ALUMINUM":"AMMONIA"...(Appedix N)

mineral item name = mineral-phyla name   set size

construct-phyla name = "BUILDING":"MONOLITH"...(Appendix O)

construct item name = construct-phyla name  rough set size

serial number = "1":"2":"3"...."9999"

food item name = "FOODPACK " serial number set size

item  name  = equipment item name:
              crew  member  name:
              lifeform item name:
              mineral item name:
              construct item name:
              food item name 

equipment texture = "ROUGH":"SMOOTH"......  (Appendix G)

equipment feature = structural entity 






equipment visual description = 
     determiner " " (relative size " ")1 
     (equipment texture " ")1
     (color " ")1 
     structural entity 
     (" WITH " equipment feature 
      (" AND "  equipment feature)1 )1 ". "
                                                                              
equipment functional description = 
   equipment-phyla name " : " equipment-class name

wildcard = "AWESOME":"BEAUTIFUL"....(Appendix R)

sound amplitude = "LOUD":"FAINT":"THUNDEROUS":"DEAFENING"
sound frequency = "HIGH PITCHED":"LOW PITCHED"
sound quality = "RINGING":"POUNDING":"PIERCING"...(Appendix P)
sound = (sound amplitude)1 ((",  ")1  sound  frequency)1 
      (sound quality:wildcard) " " "SOUND":"NOISE":"BLAST":"ROAR"
                                      
radiant energy = "BEAM OF ENERGY":"FLASH OF LIGHT":"BRIGHT GLARE"

visual effect = (luminosity " ")1 (hue " ")1 radiant energy

indirect object = item name
direct object = item name

weapon effect = 
      "MISSED":"HIT":"DAMAGED":"DESTROYED":"BLOWN AWAY":
      "OBLITERATED"

internal effect = "FEELS SICK":"HAS DIED".....(Appendix Q)

special effect = "FALLS OFF":"OPENS UP".......(Appendix U)

physical effect = weapon effect:internal effect:special effect

indirect object effect = 
 ("THE ")1 indirect object " " vtb " " physical effect ". ":"! "


direct object effect = 
 ("THE ")1 direct object " " vtb " " physical effect ". ":"! "

equipment usage description = 
  "USING " equipment item name 

  ("THERE IS " determiner
    (sound:visual effect):
    (sound "AND " determiner visual effect) ". ")1

  (indirect object effect)1 

  (direct object effect)1

phase = "GASEOUS":"LIQUID":"SOLID"         
quantity = ".001":".002":....."99,999"

mass scanner description = 
     phase (", " phase)2
     mineral-phyla name (", " mineral-phyla name)2                            
     "VOLUME: " quantity " CUBIC METERS"    
     "MASS:   " quantity " KILOGRAMS"  
     "WEIGHT: " quantity " KILOGRAMS"


bio status = "DEAD":"NOT APPLICABLE":"IN STASIS":"SLEEPING":
             "EXHAUSTED":"FEVERISH":"HALLUCINATING":"HEALTHY":
             "HUNGRY":"INTOXICATED":"SICK":"STARVING":"TIRED":
             "WOUNDED":"LOOSING BLOOD"

intelligence analog = "NOT APPLICABLE":"SPONGE":"SLUG":"ANT":
             "LIZARD":"MOUSE":"EMU":"RABBIT":"CAT":"FOX":
             "MONKEY":"APE":"SUB-HUMAN":"HUMAN":"SUPER-HUMAN"

agression analog = "NOT APPLICABLE":"APHID":"PENGUIN":"EMU":
                   "RABBIT":"SQUIRREL":"DEER":"COYOTE":
                   "RACCOON":"PUNJABI":"BOB CAT":"WOLF":
                   "RHINO":"GRIZZLY":"PIRANHA"

niche = "NOT APPLICABLE":"PRODUCER":"ELECTROVORE":
        ("PHOTOSYNTHETIC ")1 (HERBIVORE:CARNIVORE:OMNIVORE)

edibility special effect = "NOT APPLICABLE":"TOXIC":
            "NEUROTOXIC":"INTOXICATING":
            "MEDICINAL":"EDIBLE":"NOURISHING":"UNUSUAL":
            "SLIGHTLY TOXIC"

percentage = ("1":"2":...."100") " %"

bio scanner description = 
     "BIO STATUS....... " bio status
     "INTELLECT ANALOG: " intelligence analog
     "AGRESSION ANALOG: " agression analog
     "NICHE............ " niche
     "EDIBILITY........ " edibility
     "CONFIDENCE LEVEL: " percentage

exterior type = "SCALES":"EXOSKELETON":"FUR":"SKIN":"HAIR":
      "FEATHERS":"ARMOR":"SURFACE"

ground movement feature = "LEG":"TENTACLE":"PSEUDOPOD":
                   "WHEEL":"TREAD":"CILIA"

air movement feature = "WING":"ROTOR":"PROPULSION TUBE":
                       "FLOTATION BULB"
manipulative feature = "WALDO":"ARM":"TENTACLE":"PSEUDOPOD":
                   "VINE":"STEM":"BRANCHE"



weapon feature = "HORN":"CLAW":"TEETH":"PINCER":"STINGER":
                 "BEAK":"HAND":"TENTACLE":"QUILL":"TAIL":
                 "MANDIBLE":"FEET":"THORN":"FOOT":"TUSK": 
                 "POISON SAC":"ACID SAC"

general weapon feature =
                (weapon feature:equipment class name)

decorative feature = "HORN":"BEAK":"SNOUT":"WING":"FEELER":
                     "SHELL":"PROTRUSION":"CREST":"MANE":
                     "EAR":"COMPOUND EYE":"EYE SPOT":
                     "EYE STALK":"EYE":"NECK":"MOUTH":
                     "WISKERS":"PLUMES":"FEET":"FOOT":"TOES":
                     "FINGERS":"FLOWER":"FRUIT":"BERRIES":
                     "BASE":"PROJECTION":"BARK":"BULB":"LEAF":
                     "LEAVES":"VINE":"HEAD":"TA TA":"HOOTER":
                     "BAZWANGO":"FENDIBULAR EXTREMULATOR"

feature descriptor = feature number 
                     (relative size)1
                     (proportion:structure:wildcard)1
                     (color)1

decorative feature descriptor =
                     feature number 
                     (relative size)1
                     (proportion:structure)1
                     (texture)1
                     (color)1 " " decorative feature ("S ")1

lifeform visual description = 
  "THERE " vtb ("ABOUT ":"AROUND ")1 (description set size)
               (relative size)1
               (proportion)1 
               (feature number " LEGGED")1
               ((symmetry):(simili))1
               "CREATURE":"LIFEFORM"
               ("S")1 ". "
  pronoun " " possessive " " (determiner " ")1 (texture " ")1 
                (color " ")1
                exterior type
                " AND " vtb " "
                "ROUGHLY":"APPROXIMATELY":"ABOUT":"AROUND"
                " "
                (set size " CM"):(meter size " METER")
                ("S ":" ")
                "TALL":"LONG" ". "










  (pronoun " " possessive " " 
    (feature descriptor " " ground movement feature ("S ")1)1
    (", ":" AND ")1
    (feature descriptor " " air movement feature ("S ")1)1
    (", ":" AND ")1
    (feature descriptor " " manipulative feature ("S ")1)1
    (", ":" AND ")1
    (feature descriptor " " weapon feature ("S ")1)1
    (", ":" AND ")1
    (decorative feature descriptor)1             
       ". ")1

   (pronoun " " vtb " CARRYING " (determiner)1
                  item name ("S")1 
                  (", ":" AND " item name ("S")1)1
                  ". ")1

lifeform audio descripion =
     pronoun " " vtb " MAKING "
     (determiner)1 " " sound ("S. "):". "

audio descripion =
     "THERE" " " vtb (determiner)1 " " sound ("S. "):". "

movement behavior = "RUNNING":"WALKING":"HOPPING":"MOVING":
                    "CRAWLING":"OOZING":"SLITHERING":"ROLLING":
                    "BOUNCING":"HOPPING":"JUMPING":"LEAPING":
                    "FLYING":"FLOATING":"JAMMING"

manipulative behavior = "WAVING":"SHAKING":"MOVING":"JERKING":
                        "WIGGLING":"FLAPPING" possesive
                        manipulative feature 

strange behavior = "VIBRATING":"SPEWING FROTH":
                    "EXPANDING AND CONTRACTING":
                    "BOBBING UP AND DOWN":
                    "SPINNING IN CIRCLES":
                    "SWAYING FROM SIDE TO SIDE"

weapon threat behavior = "AIMING":"LOWERING":"BARING":
                    "GNASHING":"GRINDING":"READYING":
                    "OPENING AND CLOSING":"WAVING":
                    "SHAKING":"JERKING":"VIBRATING":
                    "SWINGING":"WHIPPING":"WIGGLING":
                    "STOMPING" possesive weapon feature

resting behaviors = manipulative behavior:strange behavior:
                    "RESTING":"PLAYING":"FROLICKING":"ROMPING":
                    "MOTIONLESS":"BASKING":"SKIING":"VIBRATING":
                    "CHASING EACH OTHER":"SPEWING FROTH":
                    "SECRETING FLUIDS":"DIGGING":
                    "DANCING":"HOVERING":"DRIFTING":"WANDERING": 

foraging behavior = "GRAZING":"FORAGING":"HUNTING":"STALKING"

cautious behavior = "WATCHING YOU":"OBSERVING YOU":
                    "LOOKING AT YOU":"AWARE OF YOU":
                    "SCOPING THE SCENE":"POINTING AT YOU"

threatening behavior = manipulative behaviors:strange behavior:
                       weapon threat behavior 

attack behavior = 
     pronoun " " "TRY":"TRIES" " " "TO" 
       weapon usage term (determiner)1 indirect object " WITH "
       possesive  general weapon feature "! "

    (("THE ")1 indirect object " " 
                  vtb " " weapon effect ". ":"! ")1

lifeform behavioral description =
    (pronoun " " vtb movement behavior:resting behavior:
    foraging behavior:cautious behavior:threatening behavior)1:
    (attack behavior)1

lifeform biostatus description =
    "BIO STATUS: " bio status

lifeform description = (lifeform visual description)1
                       (lifeform audio description)1
                       (lifeform behavioral description)1
                       (lifeform biostatus)1


item description = 
"--------------------" item name "--------------------"
       lifeform description:equiptment description:
       mineral description:construct description










************CONTINUE WITH TERRAIN DESCRIPTION *****************
************INCLUDE CONSTRUCT DESCRIPTION *********************
************CONTINUE WITH STARSHIP SENSOR DESCRIPTION *********
************INCLUDE EVALUATION DESCRIPTION*********************
************INCLUDE ALIEN CONVERSATION FORMAT******************





APPENDIX A - HUES
    There are a total of 31 possible different hues organized in 
decreasing wavelength order. A type code associated with each hue 
discriminates between Pure (P) and Mixed (M) hues for purposes of 
combining the hues with modifying tints and/or luminosities  (see 
Appendices  B  &  C).  Only  Pure  hues  can  have  tints  and/or 
luminosities. A hue index number of 0 indicates a "null" hue, ie. 
the  hue is unimportant or not distinctive ( note that  a  "null" 
hue is different than black which is classed as a mixed color).

         1 P RED                     17 M CHARTRUSE        
         2 M MAGENTA                 18 M GREENISH BROWN   
         3 M MAROON                  19 P GREEN            
         4 M PUCE                    20 M LIME GREEN       
         5 M RUST COLORED            21 P BLUE GREEN       
         6 M PINK                    22 M TURQUOISE        
         7 P REDISH ORANGE           23 P BLUE             
         8 M BRASS COLORED           24 M LAVENDER         
         9 M BROWN                   25 P VIOLET           
        10 M BEIGE                   26 P PURPLE           
        11 M COPPER COLORED          27 M OBNOXIOUS PURPLE 
        12 P ORANGE                  28 M MAUVE            
        13 P YELLOWISH ORANGE        29 M MANY COLORED     
        14 P YELLOW                  30 M WHITE
        15 P LEMON YELLOW            31 M BLACK           
        16 P YELLOWISH GREEN





APPENDIX B - TINT
    There  are  3 different tints organized by  increasing  white 
content.
         1 DARK 
         2 GREY
         3 LIGHT

APPENDIX C - LUMINOSITY
     There  are 6 different luminosities organized in  decreasing 
luminosity order.

         1 BLINDING
         2 BRIGHT
         3 GLOWING
         4 LUMINESCENT
         5 TRANSLUCENT
         6 SHIMMERING
                  





             
APPENDIX D - STRUCTURAL ENTITY
     There are    different structural  entities.
         1 BLOB            19 DIAL      37 WINDOW
         2 SPHERE          20 LIGHT     38 SEAT
         3 GLOBE           21 METER     39 CONTROL
         4 ORB             22 LENS      40 DOOR
         5 DOME            23 HOLE      41 ENGINE
         6 CYLINDER        24 GRID      42 COIL
         7 ROD             25 RIDGE     43 FIN
         8 BAR             26 WIRE      44 HULL
         9 CONE            27 SCREEN    45 ANTENNAE
        10 PYRAMID         28 DISPLAY   46 MEMBRANE
        11 CUBE            29 HANDLE    47 ****more****
        12 BOX             30 WHEEL
        13 POLYHEDRON      31 TREAD
        14 TUBE            32 BLADE
        15 BUTTON          33 TRIGGER
        16 LEVER           34 ROTOR
        17 SWITCH          35 WING
        18 KNOB            36 SAIL

APPENDIX E - SIZE
     There   are  10  different  size  desciptors  organized   in 
increasing size order.
         1 WEE
         2 TINY
         3 VERY SMALL
         4 SMALL
         5 BIG
         6 LARGE
         7 VERY LARGE
         8 HUGE
         9 MASSIVE
        10 HUMONGOUS 
        11 GARGANTUAN

APPENDIX F - PROPORTION
     There are 13 different proportion descriptors organized from 
flat to narrow.

         1 FLATTENED
         2 FLAT
         3 WIDE
         4 THICK
         5 SQUAT
         6 GRACEFUL
         7 NARROW
         8 SLENDER
         9 ELONGATED
        10 THIN
        11 SPINDLY
        12 WILLOWY
        13 DELICATE


APPENDIX G - TEXTURE
     There  are 68 different texture descriptors  organized  by 
applicability  code  where each bit indicates legal textures  for 
the entities that can have textures.

                             BIT
                            _ 0 - MUD,QUICKSAND                  
                           /_ 1 - SAND                           
                          //_ 2 - ICE                            
                         ///_ 3 - SNOW                           
                        ////_ 4 - STONE,ROCK                     
                       /////_ 5 - WOOD                           
                      //////_ 6 - GRAVEL,PEBBLES,ROCKS,BOLDERS   
                     ///////_ 7 - DIRT,EARTH,DUST                
                    ////////_ 8 - PROTRUSIONS                    
                   /////////_ 9 - LEAF                           
                  //////////_10 - ALLOWED IN DESERT ENVIRONMENT  
                 ///////////_11 - SURFACE,MATERIAL,SUBSTANCE     
                ////////////_12 - SKIN                           
               /////////////_13 - HAIR                           
              //////////////_14 - FUR                            
             ///////////////_15 - FEATHERS                       
            ////////////////_16 - SCALES                         
           /////////////////_17 - ARMOR                          
          //////////////////_18 - EXOSKELETON                    
         ///////////////////_19 - PLASTIC
        ////////////////////_20 - METAL
       /////////////////////_21 - GLASS
      //////////////////////_22 - GRASS,STRAW,LEAVES AND VINES
     /////////////////////// 23 -                              
 1  000000000010000000000010 THATCHED          
 2  000000000010000000001000 RUSTED            
 3  000000000010010000000000 FLOWING           
 4  000000000010011000000000 WIREY             
 5  000000000010011000000010 TANGLED           
 6  000000000010011100000000 CURLY             
 7  000000000010011100000010 MATTED            
 8  000000000011000000011000 KNURLED           
 9  000000000101100000000000 WAXY              
10  000000000110000100000000 DOWNY             
11  000000000111100011110100 FILMY             
12  000000000111100011111100 DULL              
13  000000001011000011100000 BONEY             
14  000000001011100011100000 CHITONOUS         
15  000000001011100110000000 LEAFY             
16  000000001101100000000000 MUCOUSY           
17  000000001111000000000000 SHIVERING         
18  000000001111000000000000 METALLIC          
19  000000001111000010000000 SERRATED          
20  000000001111011100000000 BRISTLY           
21  000000001111011110000000 FUZZY             
22  000000001111100000000000 HAIRY             
23  000000001111100000000000 WARTY             
24  000000001111100010010000 RUBBERY           
25  000000001111100011100000 HORNY             
26  000000001111100011100000 PLASTIC LOOKING   
27  000000001111100011110000 HARD              
28  000000001111100110000000 FLESHY            
29  000000001111100111100000 LEATHERY          
30  000000010111100011100000 DRY               
31  000000011111100010000000 SPONGY            
32  000001000111000000000010 FIBEROUS          
33  000001001101111010001000 OILY              
34  000001001111000001100000 THORNY            
35  000001001111000011100000 GNARLY            
36  000010000010000000000000 CRAGGY            
37  000010000010000000000100 DUSTY             
38  000010000011000011110000 STRIATED          
39  000010001111100000000000 VEINED            
40  000010001111100001100000 POCKED            
41  000010010010000000000000 SANDY             
42  000010110011111100000010 COARSE            
43  000011001111100011111000 BUMPY             
44  000011110000000000000000 DAMP              
45  000100000011100011100000 CRUSTY            
46  001010000011000000000000 BROKEN            
47  001010000011100010011100 SLICK             
48  001010001111000010000000 JAGGED            
49  001010100111000010000000 GLASSY            
50  001011001101100000000010 DRIPPING          
51  001011010111100000000000 CRACKED           
52  001011100111111111111100 SHINEY            
53  001110100111000011100000 CRYSTALLINE       
54  010000010010000001000000 ROCKY             
55  010001010010000000000000 FINE GRAINED      
56  010010010010000000000000 GRAVELY           
57  010010100101100000000110 WET               
58  010100010011000000000000 POWDERY           
59  010110100010000000000000 WIND SWEPT        
60  011111101011100011111000 ROUGH             
61  011111101111111011111000 SMOOTH            
62  100000000000000000000000 BLOOPING          
63  100000000000000000000000 STEAMING          
64  100000000000000000000000 VISCOUS           
65  100000001101100000000000 STICKY            
66  100000001101100000000000 GOOEY             
67  100000001101100000000000 GUMMY             
68  110101011111111110000000 SOFT              












APPENDIX H - STRUCTURE
     There  are 84 different texture descriptors  organized  by 
applicability  code  where each bit indicates legal structures for 
the entities that can have structural adjectives.

                                     _0 - LEG                     
                                    /_1 - TENTACLE
                                   //_2 - WING
                                  ///_3 - FLOATATION BULB
                                 ////_4 - ARM
                                /////_5 - BRANCH
                               //////_6 - HORN
                              ///////_7 - BEAK
                             ////////_8 - CLAW
                            /////////_9 - TEETH
                           //////////_10- TAIL
                          ///////////_11- FEET
                         ////////////_12- TUSK
                        /////////////_13- SNOUT
                       //////////////_14- FEELER
                      ///////////////_15- SHELL
                     ////////////////_16- PROTRUSION/PROJECT.
                    /////////////////_17- CREST
                   //////////////////_18- EAR
                  ///////////////////_19- EYE
                 ////////////////////_20- MOUTH
                /////////////////////_21- FLOWER
               //////////////////////_22- FRUIT
              ///////////////////////_23- LEAVES
             ////////////////////////_24- HEAD 
     (1)    /////////////////////////_25- CONSTRUCT/BUILDING..
           //////////////////////////_26- TOWER/OBELISK
     (2)  ///////////////////////////_27- STATUE/MONOLITH/...
         ////////////////////////////_28- HIVE/BURROW/MOUND
        /////////////////////////////_29- CAVE/OPENING/PIT
       //////////////////////////////_30- EMPLACEMENT
      ///////////////////////////////_31- EQUIPMENT
     ////////////////////////////////
01  00000000000000000000000001001001 PYRAMID SHAPED    
02  00000000000000000000000001010000 RECTANGULAR       
03  00000000000000000000000001100001 CYLINDRICAL       
04  00000000000000000000000001110000 DETAILED          
05  00000000000000000000000101000101 DIAMOND SHAPED    
06  00000000000000000000000101010101 SQUARE            
07  00000000000000000000010100000000 HEART SHAPED      
08  00000000000000000000010101100101 HEXAGONAL         
09  00000000000000000000100000000100 CAVERNOUS         
10  00000000000000000000100000000100 GAPING            
11  00000000000000000000100000000100 SLASH-LIKE        
12  00000000000000000000100101001101 CIRCULAR          
13  00000000000000000000100111000001 TRIANGULAR        
14  00000000000000000001000000000000 DEEP SET          
15  00000000000000000001000000000000 PUPIL-LESS        
16  00000000000000000011000000000000 HOLE-LIKE         
17  00000000000000000100010001100001 FINELY SCULPTURED 
18  00000000000000010000000100000000 SCALLOPED         
19  00000000000000010000001001010001 CUBOID            
20  00000000000000010000001101100101 ROUND             
21  00000000000000010000010101100101 OCTAGONAL         
22  00000000000000010001001111100101 OVAL              
23  00000000000000010010010100000001 BOWL SHAPED       
24  00000000000011000011000000000000 PROTRUDING        
25  00000000000100000000000000000000 SPLAYED           
26  00000000000100000010010100000001 CUPPED            
27  00000000000100010000010101000001 DISH SHAPED       
28  00000000000100010000011101000001 DISK SHAPED       
29  00000000001000000100000000000011 ARMOURED          
30  00000000010000000000000000000000 SABER             
31  00000000010010000000000000000000 FANG-LIKE         
32  00000000100000000000000000000000 TALON-LIKE        
33  00000000100000100000010010000001 RETRACTIBLE       
34  00000000110000000000000000000000 THORN-LIKE        
35  00000000110000000000000000000001 BLADE-LIKE        
36  00000001000100010001011101000001 SAUCER SHAPED     
37  00000010000010010000010101100001 SPIRAL            
38  00000010001000010100000000000001 SPIKED            
39  00000010010000100000000100100001 NEEDLE SHAPED     
40  00000011000001000000000000000001 BLUNT             
41  00000011000001010000000011101001 CONICAL           
42  00000011100010000000000000000000 HOOKED            
43  00000011110000000000000100000001 RAZOR SHARP       
44  00000011110010000000000000000001 SHARP             
45  00000100000000000000000000000001 FLEXIBLE          
46  00000100000000000000000100100001 SPEAR SHAPED      
47  00000100000000000000001100100001 ROD SHAPED        
48  00000110000010000000000000000001 PRONGED           
49  00000111111111000010000101100001 POINTED           
50  00010000000000000000011001000001 SPHERICAL         
51  00010000000000001000001111001000 GLOBULAR          
52  00010000000000001001000000000000 BULGING           
53  00010000000000010000000011001001 DOME SHAPED       
54  00010000000000010000011101000001 TEAR SHAPED       
55  00010000000001001000001010000000 BULBOUS           
56  00100000000000000000000000000000 BAT               
57  00100000000000000000000000000000 BUTTERFLY         
58  00100000000000000000000000000000 VESTIGIAL         
59  00100000000000101100000000000000 FIN-LIKE          
60  00100000000100000010000100000000 FLOPPY            
61  00100000001100000010010100000000 FAN SHAPED        
62  00100000100100000000000000000000 WEBBED            
63  00100010000000110000000101110001 VERY INTRICATE    
64  00100110001010000000000000000000 SWEEPING          
65  00100111001010000000001101000001 CURVED            
66  00110000000100101100000000000000 LEAF-LIKE         
67  00110000001100101110010100000000 FEATHERY          
68  00110100000000000000000100000000 RIGID             
69  00110110000000010000000101010101 IRREGULAR         
70  01000000000000001000001000000000 GELATINOUS        
71  01000000001000100000000000000000 WHIP-LIKE         
72  01000000001101000000000000000000 PREHENSILE        
73  01001111000110011000001010010000 GNARLED           
74  01011100001000111100001100000000 SPINEY            
75  01110000000001101110010100000000 MEMBRANOUS        
76  10000000000000001000000000000000 STALK-LIKE        
77  10001000000000100000000000000000 STEM-LIKE         
78  10101000000000000000000000000000 MULTI-JOINTED     
79  10101000100000110000000000000001 JOINTED           
80  11000000000000100000000000000000 ROOT-LIKE         
81  11001000000000001000000000000000 BRANCH-LIKE       
82  11101000101001000000000000000000 MUSCULAR          
83  11101001101000000000000000000001 POWERFUL-LOOKING  
84  11101111000101001000000000000001 STUBBY            
  (1) - Includes CONSTRUCT,BUILDING,STRUCTURE,EDIFICE,
                 HABITATION
  (2) - Includes STATUE,MONOLITH,FOUNTAIN

APPENDIX I - SYMMETRY
     There  are  5 different symmetries organized  by  increasing 
complexity.

     1 AMORPHOUS
     2 IRREGULAR
     3 SPHERICAL
     4 RADIAL
     5 BILATERAL

APPENDIX J - SIMILI
     There  are    simili adjectives organized by attribute  code 
(to be forthcoming).

      AMEBOID        
      TREE-LIKE      
      BALLOON-LIKE   
      ANTELLOPE-LIKE 
      BIRD-LIKE      
      DINOSAUR-LIKE  
      HUMANOID       
      INSECTOID      
      PLANT-LIKE     
      BEAR-LIKE      
      REPTILIAN      
      RODENT-LIKE    
      SLUG-LIKE      
      SNAIL-LIKE     
      SNAKE-LIKE     
      SPIDER-LIKE    
      TURTLE-LIKE    
      ROCK-LIKE      
      FUNGOID        
      EWOK-LIKE      
      STARFISH-LIKE  




APPENDIX K - ETHNIC ORIGIN
    There  are 13  different  ethnic origins  for  equipment  and 
constructs  and they are organized in no particular order that  I 
can see... can you Greg?

      1 OLD EMPIRE
      2 ELOWAN
      3 THRYNN
      4 VELOXI
      5 MECHAN
      6 SPEMIN  
      7 GAZURTOID
      8 SEEAYTI
      9 ULEK
     10 PHLEGMAK
     11 JAGGN
     12 NUMLOX
     13 XYSTYTHYX

APPENDIX L - EQUIPMENT-PHYLA NAME
     There are 6 different equipment phyla.
      1 WEAPON
      2 VEHICLE
      3 SENSOR
      4 COMMUNICATION
      5 LIFE SUPPORT
      6 GENERAL

APPENDIX M - EQUIPMENT-CLASS NAME ( PROPER NAME )
    There are a total of    different equipment classes organized 
by  phyla  and  are function descriptive.***** THIS  APPENDIX  IS 
SUBJECT TO CHANGE AND ADDITIONS *****

   PHYLA: WEAPON   -------- EQUIPMENT-CLASS NAME -----------
                    KNIFE            SLING                                  
                    SWORD            ROCK                 
                    STUN PROJECTOR   CLUB                 
                    NEEDLER          DARTS                
                    WEB GUN          BOOMERANG            
                    LASER PISTOL     MAGNUM               
                    LASER RIFLE      PROJECTILE GUN       
                    SONIC RIFLE      THRIP GUN            
                    STUN GRENADE     SHTOLTAC RIFLE       
                    PLASMA GRENADE   LIGHT SABER          
                    MORTAR           ECSTASY ORB          
                    BOLO             FOCUSING CONE        
                    FLAIL            BLACK EGG             
                    BOW              
                    SPEAR
                    PIKE
                    JAVELIN

  PHYLA:VEHICLE     SKIMMER
                    FLOATER
                    HOVERCRAFT
                    LANDCRAWLER
                    ICE CLIPPER
                    ROBOWALKER
                    ORNITHOPTER
                    GYROCOPTER
                    LANDSPHERE
                    VACUUM LIFTER
                    STRATOCRUISER
                    GROUNDLEAPER
                    CENTIPEDE
                    DIRIGIBLE
                    GLIDER
                    SANDSHIP
                    BOAT
                    TRIWHEEL

PHYLA:SENSOR        BIOSCANNER
                    MASSCANNER
                    FUNCTION ANALYZER
                    IMAGE AMPLIFIER
                    ENDURIUM SENSOR

PHYLA:COMMINICATION UNIVERSAL TRANSLATOR
                    
PHYLA:LIFE SUPPORT  FOOD PROCESSOR
                    L DUTY E-SUIT  (LIGHT ENVIRONMENT SUIT)
                    M DUTY E-SUIT
                    H DUTY E-SUIT
                    MEDIKIT
                    
PHYLA:GENERAL       MINING GEAR
                    ALIEN REPELLENT SPRAY 
                    MALTHUSIAN MUK-MUK 
                    ASSORTED GEMS
                    DENEBIAN FIRE WINE
                    SYNTHI-HARP
                    PLASTIC BEADS
                    HOLO-IMAGER
                    BEEF JERKY
                    SUN GLASSES
                    TANNING LOTION
                    GUMMY BEARS
                    GHETTO BLASTER
                    STARFLIGHT GAME 
                    MYSTERY BOX
                    









APPENDIX N - MINERAL-PHYLA NAME 
    There are a total of 45 different minerals. 

   1 HYDROGEN                  23 SILVER           
   2 HELIUM                    24 TIN                
   3 CARBON                    25 ANTIMONY           
   4 NITROGEN                  26 TUNGSTEN           
   5 OXYGEN                    27 PLATINUM           
   6 NEON                      28 GOLD               
   7 SODIUM                    29 MERCURY            
   8 MAGNESIUM                 30 LEAD               
   9 ALUMINUM                  31 ENDURIUM           
  10 SILICON                   32 PROMETHIUM         
  11 SULFUR                    33 PLUTONIUM          
  12 CLORINE                   34 AMMONIA            
  13 CALCIUM                   35 CARBON DIOXIDE     
  14 TITANIUM                  36 AMALCHALITE        
  15 CHROMIUM                  37 CARBON MONOXIDE    
  16 IRON                      38 ETHANE             
  17 COBALT                    39 ETHANOL            
  18 NICKEL                    40 HYDROGEN CYANIDE   
  19 COPPER                    41 HYDROGEN SULFIDE   
  20 ZINC                      42 METHANE            
  21 KRYPTON                   43 METHANOL           
  22 MOLYBDENUM                44 OZONE              
                               45 WATER                              
APPENDIX O - CONSTRUCT-PHYLA NAME
    There are 17 different construct phyla names.
     
 1 CONSTRUCT  
 2 BUILDING   
 3 STRUCTURE  
 4 EDIFICE    
 5 HABITATION 
 6 STATUE     
 7 MONOLITH   
 8 FOUNTAIN   
 9 TOWER      
10 OBELISK    
11 HIVE       
12 BURROW     
13 MOUND      
14 CAVE       
15 OPENING    
16 PIT        
17 EMPLACEMENT









APPENDIX P - SOUND QUALITY    

     There are 42 sounds organized in order of inclusion code.

             _LIFEFORM            
            /_HIGH PITCHED        
           //_LOW PITCHED         
          ///_LOAD                
         ////_THUNDEROUS/DEAFENING
        /////_BLAST/ROAR          
       //////_EQUIPMENT           
      ///////_(NOT USED)          
     ////////                     
 1  00011110 EXPLOSIVE  
 2  00111010 BOOMING    
 3  00111010 FUNKY      
 4  00111010 POUNDING   
 5  00111010 RUMBLING   
 6  00111011 RESONATING 
 7  01010010 RINGING    
 8  01110110 SIZZELING  
 9  01111010 MECHANICAL 
10  10000000 FLAPPING   
11  10000000 WHISPERING 
12  10010000 CHATTERING 
13  10010000 CRASHING   
14  10010000 CRACKLING  
15  10010000 HOWLING    
16  10010000 SNAPPING   
17  10010010 CLICKING   
18  10010010 CRUNCHING  
19  10010010 POPPING    
20  10010010 TAPPING    
21  10010010 WHOOSING   
22  10010010 BUZZING    
23  10100000 COOING     
24  10100010 MURMURING  
25  10110000 GROWLING   
26  10110000 THUMPING   
27  10110010 DRUMMING   
28  10110010 GRINDING   
29  10110010 PURRING    
30  10110010 THRUMMING  
31  10111010 ROARING    
32  11010000 CACKLING   
33  11010000 CHIRPING   
34  11010000 SCREACHING 
35  11010000 SQEEELING  
36  11010010 WHINING    
37  11010010 WHISTLING  
38  11010110 PIERCING   
39  11010110 SCREAMING  
40  11100010 MUSICAL    
41  11110010 HUMMING    
42  11110110 HISSING    
APPENDIX Q - INTERNAL EFFECT
     These are things that happen to crew members when an item is 
used including food which is used automatically.

 1 STARTS TO FEEL BETTER
 2 IS WOUNDED
 3 FEELS SICK
 4 HAS DIED
 5 FEELS STRANGE
 6 FEELS ALERT  
 7 FEELS CONFUSED
 8 FEELS STRONGER
 9 FEELS WEAKER
10 FEELS TINGLEY ALL OVER   
11 FEELS TOTALLY WASTED

APPENDIX R - WILD CARD ADJECTIVES
    For rare use to add variety and humor.

        _ LIFEFORM FEATURE
       /_ SOUND
      //_ CONSTRUCT
     ///_ TERRAIN
    ////
   ////
  ////
 ////  
01010000  BITCHIN'
10110000  MONDO
11010000  GROOVY
10000000  GRODY
10000000  NAUSEATING
11110000  OUTRAGEOUS
11110000  TOTALLY RADICAL
10110000  AWESOME
01000000  EDIFYING
01000000  UPLIFTING
10000000  GROTESQUE
10100000  BODACIOUS
01000000  FUNKADELIC
10000000  GORGEOUS
10000000  SEDUCTIVE
11110000  BEAUTIFUL
10110000  INCREDIBLE











APPENDIX S - TERRAIN TYPE

    
     1 LIQUID
     2 LAVA
     3 ICE
     4 SNOW
     5 QUICKSAND
     6 MUD
     7 ROCK
     8 DIRT
     9 SAND
    10 GRAVEL
    11 PEBBLES
    12 ROCKS
    13 BOLDERS
    14 CRATERS
    15 LICHEN    
    16 MOSS
    17 GRASS
    18 BRUSH
    19 SCRUB
    20 FOREST
    21 JUNGLE
    22 SWAMP
    23 MARSH

APPENDIX T - CONTRUCT MATERIALS
     
     There  are  11  different building  materials  organized  by 
minimum and maximum tech level and terrain type.

    TECH LEVEL -------TERRAIN-----
 #   MIN  MAX  SNOW/ICE    >MOSS*     MATERIAL
---------------------------------------------------------------
 1    1    7      1          0        ICE             
 2    1    7      1          1        STONE           
 3    1    7      1          1        ROCK            
 4    3    6      0          1        WOOD            
 5    1   10      1          1        MATERIAL        
 6    5   10      1          1        PLASTIC         
 7    4   10      1          1        METAL           
 8    4   10      1          1        GLASS           
 9    1    3      0          1        GRASS           
10    1    3      0          1        STRAW           
11    1    3      0          1        LEAVES AND VINES
---------------------------------------------------------------
* - SEE APPENDIX S.

APPENDIX U - SPECIAL EFFECT

     To be added as required.
```