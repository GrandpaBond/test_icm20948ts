/**DMPconsts holds all constants relating to the DMP */

// DMP INFOS
const DMP_MEM_BANK_SIZE = 256

// DMP MEMORY 
const DMP_START_ADDRESS = 0x1000
const DMP_LOAD_START = 0x90
const DMP_MAX_WRITE = 16

// DATA OUTPUT CONTROL
const DMP_DATA_OUT_CTL1 = 0x40 			// 4*16+0 - 16 bits
const DMP_DATA_OUT_CTL2 = 0x42 			// 4*16+2 - 16 bits
const DMP_DATA_INTR_CTL = 0x4C 			// 4*16+12 - 16 bits
const DMP_DATA_FIFO_WATERMARK = 0x1FE 	// 31*16+14 - 16 bits

// MOTION EVENT CONTROL
const DMP_DATA_MOTION_EVENT_CTRL = 0x4E // 4*16+14 - 16 bits

// INDICATE TO DMP WHICH SENSOR ARE AVAILABLE
const DMP_DATA_RDY_STATUS = 0x8A 		// 8*16+10

// BATCH MODE
const DMP_BM_BATCH_CNTR = 0x1B0 		// 27*16+0
const DMP_BM_BATCH_THLD = 0x13C 		// 19*16+12
const DMP_BM_BATCH_MASK = 0x15E 		// 21*16+14

// SENSOR OUTPUT DATA RATE - ALL 16 BITS
const DMP_ODR_GEOMAG = 0xA0 			// 10*16+0
const DMP_ODR_PQUAT6 = 0xA4 			// 10*16+4
const DMP_ODR_QUAT9 = 0xA8 				// 10*16+8
const DMP_ODR_QUAT6 = 0xAC 				// 10*16+12
const DMP_ODR_ALS = 0xB2 				// 11*16+2
const DMP_ODR_CPASS_CALIBR = 0xB4 		// 11*16+4
const DMP_ODR_CPASS = 0xB6 				// 11*16+6
const DMP_ODR_GYRO_CALIB = 0xB8 		// 11*16+8
const DMP_ODR_GYRO = 0xBA 				// 11*16+10
const DMP_ODR_PRESSURE = 0xBC 			// 11*16+12
const DMP_ODR_ACCEL = 0xBE 				// 11*16+14

// SENSOR OUTPUT DATA RATE COUNTER - ALL 16 BITS
const DMP_ODR_CNTR_GEOMAG = 0x80 		// 8*16+0
const DMP_ODR_CNTR_PQUAT6 = 0x84 		// 8*16+4
const DMP_ODR_CNTR_QUAT9 = 0x88 		// 8*16+8
const DMP_ODR_CNTR_QUAT6 = 0x8C 		// 8*16+12
const DMP_ODR_CNTR_ALS = 0x92 			// 9*16+2
const DMP_ODR_CNTR_CPASS_CALIBR = 0x94 	// 9*16+4
const DMP_ODR_CNTR_CPASS = 0x96 		// 9*16+6
const DMP_ODR_CNTR_GYRO_CALIBR = 0x98 	// 9*16+8
const DMP_ODR_CNTR_GYRO = 0x9A 			// 9*16+10
const DMP_ODR_CNTR_PRESSURE = 0x9C 		// 9*16+12
const DMP_ODR_CNTR_ACCEL = 0x9E 		// 9*16+14

// MOUNTING MATRIX - ALL 32 BITS
const DMP_CPASS_MTX_00 = 0x170 			// 23*16+0
const DMP_CPASS_MTX_01 = 0x174 			// 23*16+4
const DMP_CPASS_MTX_02 = 0x178 			// 23*16+8
const DMP_CPASS_MTX_10 = 0x17C 			// 23*16+12
const DMP_CPASS_MTX_11 = 0x180 			// 24*16+0
const DMP_CPASS_MTX_12 = 0x184 			// 24*16+4
const DMP_CPASS_MTX_20 = 0x188 			// 24*16+8
const DMP_CPASS_MTX_21 = 0x18C 			// 24*16+12
const DMP_CPASS_MTX_22 = 0x190 			// 25*16+0

// BIAS CALIBRATION  - ALL 32 BITS
//  Scaled by ACC 2^12 (FSR 4G) - GYRO 2^15 - COMPASS 2^16
const DMP_ACCEL_BIAS_X = 0x6E4 			// 110*16+4
const DMP_ACCEL_BIAS_Y = 0x6E8 			// 110*16+8
const DMP_ACCEL_BIAS_Z = 0x6EC 			// 110*16+12
const DMP_CPASS_BIAS_X = 0x7E4 			// 126*16+4
const DMP_CPASS_BIAS_Y = 0x7E8 			// 126*16+8
const DMP_CPASS_BIAS_Z = 0x7EC 			// 126*16+12
const DMP_GYRO_ACCURACY = 0x8A2 		// 138*16+2
const DMP_GYRO_BIAS_X = 0x8B4 			// 139*16+4
const DMP_GYRO_BIAS_Y = 0x8B8 			// 139*16+8
const DMP_GYRO_BIAS_Z = 0x8BC 			// 139*16+12
const DMP_GYRO_BIAS_SET = 0x8A6 		// 138*16+6
const DMP_GYRO_LAST_TEMPR = 0x860 		// 134*16+0
const DMP_GYRO_SLOPE_X = 0x4E4 			// 78*16+4
const DMP_GYRO_SLOPE_Y = 0x4E8 			// 78*16+8
const DMP_GYRO_SLOPE_Z = 0x4EC 			// 78*16+12

//  ACCELEROMETER CALIBRATION
const DMP_ACCEL_ACCURACY = 0x610 		// 97*16+0
const DMP_ACCEL_CAL_RESET = 0x4D0 		// 77*16+0
const DMP_ACCEL_VARIANCE_THRESH = 0x5D0 // 93*16+0
const DMP_ACCEL_CAL_RATE = 0x5E4 		// 94*16+4	16-bit: 0 (225Hz, 112Hz, 56Hz)
const DMP_ACCEL_PRE_SENSOR_DATA = 0x614 // 97*16+4
const DMP_ACCEL_COVARIANCE = 0x658 		// 101*16+8
const DMP_ACCEL_ALPHA_VAR = 0x5B0 		// 91*16+0  32-bit: 1026019965 (225Hz) 977872018 (112Hz) 882002213 (56Hz)
const DMP_ACCEL_A_VAR = 0x5C0 			// 92*16+0	32-bit: 47721859 (225Hz) 95869806 (112Hz) 191739611 (56Hz)
const DMP_ACCEL_CAL_INIT = 0x5E2 		// 94*16+2
const DMP_ACCEL_CAL_SCALE_COVQ_IN_RANGE = 0xC20 	// 194*16+0
const DMP_ACCEL_CAL_SCALE_COVQ_OUT_RANGE = 0xC30 	// 195*16+0
const DMP_ACCEL_CAL_TEMPERATURE_SENSITIVITY = 0xC24 // 194*16+4
const DMP_ACCEL_CAL_TEMPERATURE_OFFSET_TRIM = 0xC2C // 194*16+12
const DMP_CPASS_ACCURACY = 0x250 		// 37*16+0
const DMP_CPASS_BIAS_SET = 0x22E 		// 34*16+14
const DMP_MAR_MODE = 0x252 				// 37*16+2
const DMP_CPASS_COVARIANCE = 0x730 		// 115*16+0
const DMP_CPASS_COVARIANCE_CUR = 0x768 	// 118*16+8
const DMP_CPASS_REF_MAG_3D = 0x7A0 		// 122*16+0
const DMP_CPASS_CAL_INIT = 0x720 		// 114*16+0
const DMP_CPASS_EST_FIRST_BIAS = 0x710 	// 113*16+0
const DMP_MAG_DISTURB_STATE = 0x712 	// 113*16+2
const DMP_CPASS_VAR_COUNT = 0x706 		// 112*16+6
const DMP_CPASS_COUNT_7 = 0x572 		// 87*16+2
const DMP_CPASS_MAX_INNO = 0x7C0 		// 124*16+0
const DMP_CPASS_BIAS_OFFSET = 0x714 	// 113*16+4
const DMP_CPASS_CUR_BIAS_OFFSET = 0x724 // 114*16+4
const DMP_CPASS_PRE_SENSOR_DATA = 0x574 // 87*16+4

// COMPASS CALIBRATION PARAMS TO BE ADJUSTER WITH SAMPLING RATE
const DMP_CPASS_TIME_BUFFER = 0x70E 				// 112*16+14
const DMP_CPASS_RADIUS_3D_THRESH_ANOMALY = 0x708	// 112*16+8 : 4 bytes
const DMP_CPASS_STATUS_CHK = 0x19C 					// 25*16+12

// GAINS
const DMP_ACCEL_FB_GAIN = 0x220 		// 34*16+0
const DMP_ACCEL_ONLY_GAIN = 0x10C 		// 16*16+12 - 15252014 (225Hz) 30504029 (112Hz) 61117001 (56Hz)
const DMP_GYRO_SF = 0x130 				// 19*16+0 - 32-bit: gyro scaling factor

// 9-axis
const DMP_MAGN_THR_9X = 0x500 			// 80*16+0
const DMP_MAGN_LPF_THR_9X = 0x508 		// 80*16+8
const DMP_QFB_THR_9X = 0x50C 			// 80*16+12

// DMP RUNNING COUNTER
const DMP_DMPRATE_CNTR = 0x124 			// 18*16+4

// PEDOMETER
const DMP_PEDSTD_BP_B = 0x31C 			// 49*16+12
const DMP_PEDSTD_BP_A4 = 0x340 			// 52*16+0
const DMP_PEDSTD_BP_A3 = 0x344 			// 52*16+4
const DMP_PEDSTD_BP_A2 = 0x348 			// 52*16+8
const DMP_PEDSTD_BP_A1 = 0x34C 			// 52*16+12
const DMP_PEDSTD_SB = 0x328 			// 50*16+8
const DMP_PEDSTD_SB_TIME = 0x32C 		// 50*16+12
const DMP_PEDSTD_PEAKTHRSH = 0x398 		// 57*16+8
const DMP_PEDSTD_TIML = 0x32A 			// 50*16+10
const DMP_PEDSTD_TIMH = 0x32E 			// 50*16+14
const DMP_PEDSTD_PEAK = 0x394 			// 57*16+4
const DMP_PEDSTD_STEPCTR = 0x360 		// 54*16+0
const DMP_PEDSTD_STEPCTR2 = 0x3A8 		// 58*16+8
const DMP_PEDSTD_TIMECTR = 0x3C4 		// 60*16+4
const DMP_PEDSTD_DECI = 0x3A0 			// 58*16+0
const DMP_PEDSTD_SB2 = 0x3CE 			// 60*16+14
const DMP_STPDET_TIMESTAMP = 0x128 		// 18*16+8
const DMP_PEDSTEP_IND = 0x134 			// 19*16+4
const DMP_PED_Y_RATIO = 0x110 			// 17*16+0

//  SMD
const DMP_SMD_VAR_TH = 0x8DC 			// 141*16+12
const DMP_SMD_VAR_TH_DRIVE = 0x8FC 		// 143*16+12
const DMP_SMD_DRIVE_TIMER_TH = 0x8F8 	// 143*16+8
const DMP_SMD_TILT_ANGLE_TH = 0xB3C 	// 179*16+12
const DMP_BAC_SMD_ST_TH = 0xB38 		// 179*16+8
const DMP_BAC_ST_ALPHA4 = 0xB4C 		// 180*16+12
const DMP_BAC_ST_ALPHA4A = 0xB0C 		// 176*16+12

// WAKE ON MOTION
const DMP_WOM_ENABLE = 0x40E 			// 64*16+14
const DMP_WOM_STATUS = 0x406 			// 64*16+6
const DMP_WOM_THRESHOLD = 0x400 		// 64*16+0
const DMP_WOM_CNTR_TH = 0x40C 			// 64*16+12

// ACTIVITY RECOGNITION
const DMP_BAC_RATE = 0x30A 				// 48*16+10
const DMP_BAC_STATE = 0xB30 			// 179*16+0
const DMP_BAC_STATE_PREV = 0xB34 		// 179*16+4
const DMP_BAC_ACT_ON = 0xB60 			// 182*16+0
const DMP_BAC_ACT_OFF = 0xB70 			// 183*16+0
const DMP_BAC_STILL_S_F = 0xB10 		// 177*16+0
const DMP_BAC_RUN_S_F = 0xB14 			// 177*16+4
const DMP_BAC_DRIVE_S_F = 0xB20 		// 178*16+0
const DMP_BAC_WALK_S_F = 0xB24 			// 178*16+4
const DMP_BAC_SMD_S_F = 0xB28 			// 178*16+8
const DMP_BAC_BIKE_S_F = 0xB2C 			// 178*16+12
const DMP_BAC_E1_SHORT = 0x920 			// 146*16+0
const DMP_BAC_E2_SHORT = 0x924 			// 146*16+4
const DMP_BAC_E3_SHORT = 0x928 			// 146*16+8
const DMP_BAC_VAR_RUN = 0x94C 			// 148*16+12
const DMP_BAC_TILT_INIT = 0xB50 		// 181*16+0
const DMP_BAC_MAG_ON = 0xE10 			// 225*16+0
const DMP_BAC_PS_ON = 0x4A0 			// 74*16+0
const DMP_BAC_BIKE_PREFERENCE = 0xAD8 	// 173*16+8
const DMP_BAC_MAG_I2C_ADDR = 0xE58 		// 229*16+8
const DMP_BAC_PS_I2C_ADDR = 0x4B4 		// 75*16+4
const DMP_BAC_DRIVE_CONFIDENCE = 0x900 	// 144*16+0
const DMP_BAC_WALK_CONFIDENCE = 0x904 	// 144*16+4
const DMP_BAC_SMD_CONFIDENCE = 0x908 	// 144*16+8
const DMP_BAC_BIKE_CONFIDENCE = 0x90C 	// 144*16+12
const DMP_BAC_STILL_CONFIDENCE = 0x910 	// 145*16+0
const DMP_BAC_RUN_CONFIDENCE = 0x914 	// 145*16+4
const DMP_BAC_MODE_CNTR = 0x960 		// 150*16+0
const DMP_BAC_STATE_T_PREV = 0xB94 		// 185*16+4
const DMP_BAC_ACT_T_ON = 0xB80 			// 184*16+0
const DMP_BAC_ACT_T_OFF = 0xB84 		// 184*16+4
const DMP_BAC_STATE_WRDBS_PREV = 0xB98 	// 185*16+8
const DMP_BAC_ACT_WRDBS_ON = 0xB88 		// 184*16+8
const DMP_BAC_ACT_WRDBS_OFF = 0xB8C 	// 184*16+12
const DMP_BAC_ACT_ON_OFF = 0xBE2 		// 190*16+2
const DMP_PREV_BAC_ACT_ON_OFF = 0xBC2 	// 188*16+2
const DMP_BAC_CNTR = 0x302 				// 48*16+2

// FLIP AND PICK-UP
const DMP_FP_VAR_ALPHA = 0xF58 			// 245*16+8
const DMP_FP_STILL_TH = 0xF64 			// 246*16+4
const DMP_FP_MID_STILL_TH = 0xF48 		// 244*16+8
const DMP_FP_NOT_STILL_TH = 0xF68 		// 246*16+8
const DMP_FP_VIB_REJ_TH = 0xF18 		// 241*16+8
const DMP_FP_MAX_PICKUP_T_TH = 0xF4C 	// 244*16+12
const DMP_FP_PICKUP_TIMEOUT_TH = 0xF88 	// 248*16+8
const DMP_FP_STILL_CONST_TH = 0xF6C 	// 246*16+12
const DMP_FP_MOTION_CONST_TH = 0xF08 	// 240*16+8
const DMP_FP_VIB_COUNT_TH = 0xF28 		// 242*16+8
const DMP_FP_STEADY_TILT_TH = 0xF78 	// 247*16+8
const DMP_FP_STEADY_TILT_UP_TH = 0xF2C 	// 242*16+12
const DMP_FP_Z_FLAT_TH_MINUS = 0xF38 	// 243*16+8
const DMP_FP_Z_FLAT_TH_PLUS = 0xF3C 	// 243*16+12
const DMP_FP_DEV_IN_POCKET_TH = 0x4CC 	// 76*16+12
const DMP_FP_PICKUP_CNTR = 0xF74 		// 247*16+4
const DMP_FP_RATE = 0xF0C 				// 240*16+12

// GYRO FSR
const DMP_GYRO_SCALE = 0x48C 			// 72*16+12

// ACCEL FSR
const DMP_ACC_SCALE = 0x1E0 			// 30*16+0
const DMP_ACC_SCALE2 = 0x4F4 			// 79*16+4

// EIS AUTHENTIFICATION
const DMP_EIS_AUTH_INPUT = 0xA04 		// 160*16+4
const DMP_EIS_AUTH_OUTPUT = 0xA00 		// 160*16+0

// B2S
const DMP_B2S_RATE = 0x308 				// 48*16+8

// BRING TO SEE MOUNTING MATRIX 
const DMP_B2S_MTX_00 = 0xD00 			// 208*16+0
const DMP_B2S_MTX_01 = 0xD04 			// 208*16+4
const DMP_B2S_MTX_02 = 0xD08 			// 208*16+8
const DMP_B2S_MTX_10 = 0xD0C 			// 208*16+12
const DMP_B2S_MTX_11 = 0xD10 			// 209*16+0
const DMP_B2S_MTX_12 = 0xD14 			// 209*16+4
const DMP_B2S_MTX_20 = 0xD18 			// 209*16+8
const DMP_B2S_MTX_21 = 0xD1C 			// 209*16+12
const DMP_B2S_MTX_22 = 0xD20 			// 210*16+0

// DMP ORIENTATION PARAMETERS (Q30) INITIALISATION 
const DMP_Q0_QUAT6 = 0x210 				// 33*16+0
const DMP_Q1_QUAT6 = 0x214 				// 33*16+4
const DMP_Q2_QUAT6 = 0x218 				// 33*16+8
const DMP_Q3_QUAT6 = 0x21C 				// 33*16+12

// ================================================================================
//  DMP CONSTANTS AND RELATED STUFF
// ================================================================================

// DMP DATA SIZE
const DMP_Header_Bytes = 2
const DMP_header2_Bytes = 2
const DMP_Raw_Accel_Bytes = 6
const DMP_Raw_Gyro_Bytes = 6
const DMP_Gyro_Bias_Bytes = 6
const DMP_Compass_Bytes = 6
const DMP_ALS_Bytes = 8 			// Byte[0]: Dummy, Byte[2:1]: Ch0DATA, Byte[4:3]: Ch1DATA, Byte[6:5]: PDATA, Byte[7]: Dummy
const DMP_Quat6_Bytes = 12 			// 3 x 4_Bytes data (Q1, Q2, Q3, Q0 is deducted throught Q0^2+Q1^2+Q2^2+Q3^2=1
const DMP_Quat9_Bytes = 14 			// 3 x 4_Bytes data + 2_Bytes heading accuracy
const DMP_Pedom_Quat6_Bytes = 6
const DMP_Geomag_Bytes = 14 		//same as Quat9, The quaternion data is scaled by 2^30
const DMP_Pressure_Bytes = 6 		// Byte [2:0]: Pressure data, Byte [5:3]: Temperature data
const DMP_Gyro_Calibr_Bytes = 12 	// Hardware unit scaled by 2^15
const DMP_Compass_Calibr_Bytes = 12 // Hardware unit scaled by 2^16
const DMP_Step_Detector_Bytes = 4
const DMP_Accel_Accuracy_Bytes = 2
const DMP_Gyro_Accuracy_Bytes = 2
const DMP_Compass_Accuracy_Bytes = 2
const DMP_Fsync_Detection_Bytes = 2
const DMP_Pickup_Bytes = 2
const DMP_Activity_Recognition_Bytes = 6 // Byte [0]: State-Start, Byte [1]: State-End, Byte [5:2]: timestamp
const DMP_Secondary_On_Off_Bytes = 2
const DMP_Footer_Bytes = 2
const DMP_Maximum_Bytes = 14

// DMP Data_Output_Control_1 (from highest bit to lowest bit)
// also used for Header_1 Bitmap check in FIFO decoding
const DMP_DO_Ctrl_1_Accel = 0x8000 			//16 bit
const DMP_DO_Ctrl_1_Gyro = 0x4000 			//16 bit
const DMP_DO_Ctrl_1_Compass = 0x2000 		//16 bit
const DMP_DO_Ctrl_1_ALS = 0x1000 			//16 bit
const DMP_DO_Ctrl_1_Quat6 = 0x0800 			//32 bit 6 axis
const DMP_DO_Ctrl_1_Quat9 = 0x0400 			//32 bit 6 axis
const DMP_DO_Ctrl_1_Pedom_Quat6 = 0x0200 	//16 bit
const DMP_DO_Ctrl_1_Geomag = 0x0100 		// 32 bit + heading accuracy
const DMP_DO_Ctrl_1_Pressure = 0x0080 		//16 bit
const DMP_DO_Ctrl_1_Gyro_Calibr = 0x0040 	//32 bit
const DMP_DO_Ctrl_1_Compass_Calibr = 0x0020 //32 bit
const DMP_DO_Ctrl_1_Step_Detector = 0x0010 	//Pedometer Step detector
const DMP_DO_Ctrl_1_Header2 = 0x0008 		//Header 2
const DMP_DO_Ctrl_1_Step_Ind_2 = 0x0004 	//Pedometer Step Indicator Bit 2
const DMP_DO_Ctrl_1_Step_Ind_1 = 0x0002 	//Pedometer Step Indicator Bit 1
const DMP_DO_Ctrl_1_Step_Ind_0 = 0x0001 	//Pedometer Step Indicator Bit 0

// DMP Data_Output_Control_2 (from highest bit to lowest bit)
// also used for Header_2 Bitmap check in FIFO decoding
const DMP_DO_Ctrl_2_Accel_Accuracy = 0x4000
const DMP_DO_Ctrl_2_Gyro_Accuracy = 0x2000
const DMP_DO_Ctrl_2_Compass_Accuracy = 0x1000
const DMP_DO_Ctrl_2_Fsync = 0x0800
const DMP_DO_Ctrl_2_Pickup = 0x0400
const DMP_DO_Ctrl_2_Batch_Mode_Enable = 0x0100
const DMP_DO_Ctrl_2_Activity_Recog = 0x0080
const DMP_DO_Ctrl_2_Secondary_On_Off = 0x0040

// DMP Interruption Masks
// Determine wich sensor needs to be on (32bits)
const INV_NEEDS_ACCEL_MASK0 = 0b11100010100111101000111000001010
const INV_NEEDS_ACCEL_MASK1 = 0b00000000000000000000011011101000
const INV_NEEDS_GYRO_MASK0 = 0b11100110000000011000111000011000
const INV_NEEDS_GYRO_MASK1 = 0b00000000000000000000100000011000
const INV_NEEDS_COMPAS_MASK0 = 0b10000011000100000100100000001100
const INV_NEEDS_COMPAS_MASK1 = 0b00000000000000000000000010000100
const INV_NEEDS_PRES_MASK0 = 0b00010000000000000000000001000000
const INV_NEEDS_PRES_MASK1 = 0b00000000000000000000000000000000

// DMP Data ready
const DMP_Data_Ready_Gyro = 0x0001
const DMP_Data_Ready_Accel = 0x0002
const DMP_Data_Ready_Secondary_Compass = 0x0008

// DMP Event Control
const DMP_Motion_Event_Control_BAC_Wearable = 0x8000
const DMP_Motion_Event_Control_Activity_Recog_Pedom = 0x4000
const DMP_Motion_Event_Control_Pedometer_Interrupt = 0x2000
const DMP_Motion_Event_Control_Tilt_Interrupt = 0x1000
const DMP_Motion_Event_Control_Significant_Motion_Det = 0x0800
const DMP_Motion_Event_Control_Accel_Calibr = 0x0200
const DMP_Motion_Event_Control_Gyro_Calibr = 0x0100
const DMP_Motion_Event_Control_Compass_Calibr = 0x0080
const DMP_Motion_Event_Control_9axis = 0x0040
const DMP_Motion_Event_Control_BTS = 0x0020
const DMP_Motion_Event_Control_Pickup = 0x0010
const DMP_Motion_Event_Control_Geomag = 0x0008
const DMP_Motion_Event_Control_Bring_Look_To_See = 0x0004
const DMP_Motion_Event_Control_Activity_Recog_Pedom_Accel = 0x0002

const DMP_SENSORS_2_ANDROID = {
    0: 1, 1: 4, 2: 42, 3: 43, 4: 14, 5: 16, 6: 47, 7: 18, 8: 19,
    9: 15, 10: 11, 11: 20, 12: 2, 13: 17, 14: 46, 15: 41, 16: 9,
    17: 10, 18: 3, 19: 45, 20: 44
}

// Android sensor control bits, 45 to 46 are trials
const ANDROID_SENSORS_CTRL_BITS = {
    0: 0xFFFF, 1: 0x8008, 2: 0x0028, 3: 0x0408,
    4: 0x4048, 5: 0x1008, 6: 0x0088, 7: 0xFFFF, 8: 0xFFFF, 9: 0x0808,
    10: 0x8808, 11: 0x0408, 12: 0xFFFF, 13: 0xFFFF, 14: 0x2008, 15: 0x0808,
    16: 0x4008, 17: 0x0000, 18: 0x0018, 19: 0x0010, 20: 0x0108, 21: 0xFFFF,
    22: 0xFFFF, 23: 0x8008, 24: 0x0028, 25: 0x0408, 26: 0x4048, 27: 0x1008,
    28: 0x0088, 29: 0x0808, 30: 0x8808, 31: 0x0408, 32: 0xFFFF, 33: 0xFFFF,
    34: 0x2008, 35: 0x0808, 36: 0x4008, 37: 0x0018, 38: 0x0010, 39: 0x0108,
    40: 0xFFFF, 41: 0x0000, 42: 0x8008, 43: 0x4048, 44: 0xFDF8, 45: 0xFFFF,
    46: 0xFFFF, 47: 0x4000
}

const DMP_SENSORS = {
    "ACCELEROMETER": 0, "GYROSCOPE": 1, "RAW_ACCELEROMETER": 2, "RAW_GYROSCOPE": 3,
    "MAGNETIC_FIELD_UNCALIBRATED": 4, "GYROSCOPE_UNCALIBRATED": 5, "ACTIVITY_CLASSIFICATON": 6,
    "STEP_DETECTOR": 7, "STEP_COUNTER": 8, "GAME_ROTATION_VECTOR": 9, "ROTATION_VECTOR": 10,
    "GEOM_ROTATION_VECTOR": 11, "GEOM_FIELD": 12, "WAKEUP_SIGNIFICANT_MOTION": 13,
    "FLIP_PICKUP": 14, "WAKEUP_TILT_DETECTOR": 15, "GRAVITY": 16, "LINEAR_ACCELERATION": 17,
    "ORIENTATION": 18, "B2S": 19, "ALL": 20
}

const DMP_ACTIVITY = { "Drive": 0x01, "Walk": 0x02, "Run": 0x04, "Bike": 0x08, "Tilt": 0x10, "Still": 0x20 }
const DMP_SECONDARY = { "Gyro_Off": 0x01, "Gyro_On": 0x02, "Compass_Off": 0x04, "Compass_On": 0x08, "Prox_Off": 0x10, "Prox_On": 0x20 }
// Add your code here
