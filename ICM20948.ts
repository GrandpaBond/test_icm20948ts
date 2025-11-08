
// TypeScript driver for Microbit (inspired by https://github.com/pimoroni/icm20948-python)
// (Also drawing insights from https://github.com/dobodu/ICM20948_DMP_Micropython/blob/main/icm20948.py)

//namespace ICM {
const ICM20948_I2C_ADDR = 0x68
const ICM20948_BANK_SEL = 0x7f

// Bank 0
const ICM20948_WHO_AM_I = 0x00 // ID register
const   ICM20948_CHIP_ID = 0xEA // ID value expected
const ICM20948_USER_CTRL = 0x03
const   ICM20948_USER_CTRL_DMP_EN = 0b10000000
const   ICM20948_USER_CTRL_FIFO_EN = 0b01000000
const   ICM20948_USER_CTRL_I2C_MST_EN = 0b00100000
const   ICM20948_USER_CTRL_I2C_IF_DIS = 0b00010000
const   ICM20948_USER_CTRL_DMP_RST = 0b00001000
const   ICM20948_USER_CTRL_SRAM_RST = 0b00000100
const   ICM20948_USER_CTRL_I2C_MST_RST = 0b00000010
const ICM20948_PWR_MGMT_1 = 0x06
const   ICM20948_PWR_MGMT_1_RESET = 0x80
const   ICM20948_PWR_MGMT_1_CLOCK_AUTO = 0x01
const ICM20948_PWR_MGMT_2 = 0x07
const ICM20948_INT_PIN_CFG = 0x0F
const   ICM20948_INT_PIN_CFG_BYPASS_EN = 0b00000010

//const ICM20948_ACCEL_SMPLRT_DIV_1 = 0x10
//const ICM20948_ACCEL_SMPLRT_DIV_2 = 0x11
//const ICM20948_ACCEL_INTEL_CTRL = 0x12
//const ICM20948_ACCEL_WOM_THR = 0x13
const ICM20948_ACCEL_CONFIG = 0x14
const ICM20948_INT_STATUS_1  = 0x1A // bottom bit holds RAW_DATA_0_RDY_INT
//  (Sensor Register Raw Data, from all sensors, is updated and ready to be read)
const ICM20948_ACCEL_XOUT_H = 0x2D
const ICM20948_GRYO_XOUT_H = 0x33

const ICM20948_TEMP_OUT_H = 0x39
const ICM20948_TEMP_OUT_L = 0x3A
const ICM20948_EXT_SLV_SENS_DATA_00 = 0x3B // where slave data goes


// Bank 2
const ICM20948_GYRO_SMPLRT_DIV = 0x00
const ICM20948_GYRO_CONFIG_1 = 0x01
const   ICM20948_GYRO_CONFIG_1_GYRO_FS_SEL_MASK = 0b11111001
const   ICM20948_GYRO_CONFIG_1_GYRO_DLPCFCFG_MASK = 0b10001110
const ICM20948_GYRO_CONFIG_2 = 0x02
const ICM20948_ODR_ALIGN_EN = 0x09
const ICM20948_ACCEL_SMPLRT_DIV_1 = 0x10
const ICM20948_ACCEL_SMPLRT_DIV_2 = 0x11
const ICM20948_ACCEL_INTEL_CTRL = 0x12
const ICM20948_ACCEL_WOM_THR = 0x13
const ICM20948_ACCEL_CONFIG_1 = 0x14
const   ICM20948_ACCEL_CONFIG_1_ACCEL_FS_SEL_MASK = 0b11111001
const   ICM20948_ACCEL_CONFIG_1_ACCEL_DLPFCFG_MASK = 0b10001110
const ICM20948_ACCEL_CONFIG_2 = 0x15
const ICM20948_PRS_ODR_CONFIG = 0x20
const ICM20948_PRGM_START_ADDRH = 0x50
const ICM20948_PRGM_START_ADDRL = 0x51
const ICM20948_FSYNC_CONFIG = 0x52
const ICM20948_TEMP_CONFIG = 0x53
const ICM20948_MOD_CTRL_USR = 0x54
const   ICM20948_MOD_CTRL_USR_REG_LP_DMP_EN = 0x01

// Bank 3
const ICM20948_I2C_MST_ODR_CONFIG = 0x00
const ICM20948_I2C_MST_CTRL = 0x01
const   ICM20948_I2C_MST_CTRL_MULTI = 0b10000000 // Multi master
const   ICM20948_I2C_MST_CTRL_NSR   = 0b00010000 // Stop between reads
const ICM20948_I2C_MST_DELAY_CTRL = 0x02
const ICM20948_I2C_SLV0_ADDR = 0x03
const ICM20948_I2C_SLV0_REG = 0x04
const ICM20948_I2C_SLV0_CTRL = 0x05
const ICM20948_I2C_SLV0_DO = 0x06
const ICM20948_I2C_SLV1_ADDR = 0x07
const ICM20948_I2C_SLV1_REG = 0x08
const ICM20948_I2C_SLV1_CTRL = 0x09
const ICM20948_I2C_SLV1_DO = 0x0A
const ICM20948_I2C_SLV2_ADDR = 0x0B
const ICM20948_I2C_SLV2_REG = 0x0C
const ICM20948_I2C_SLV2_CTRL = 0x0D
const ICM20948_I2C_SLV2_DO = 0x0E
const ICM20948_I2C_SLV3_ADDR = 0x0F
const ICM20948_I2C_SLV3_REG = 0x10
const ICM20948_I2C_SLV3_CTRL = 0x11
const ICM20948_I2C_SLV3_DO = 0x12
const ICM20948_I2C_SLV4_ADDR = 0x13
const ICM20948_I2C_SLV4_REG = 0x14
const ICM20948_I2C_SLV4_CTRL = 0x15
const ICM20948_I2C_SLV4_DO = 0x16
const ICM20948_I2C_SLV4_DI = 0x16

// Bank 3 COMMON
const   ICM20948_I2C_SLV_ADDR_RNW        = 0b10000000 // 0x80 // set for R(ead) N(ot) W(rite)
const   ICM20948_I2C_SLV_CTRL_SLV_ENABLE = 0b10000000 // 0x80
const   ICM20948_I2C_SLV_CTRL_BYTE_SWAP  = 0b01000000 // 0x40
const   ICM20948_I2C_SLV_CTRL_REG_DIS    = 0b00100000 // 0x20
const   ICM20948_I2C_SLV_CTRL_REG_GROUP  = 0b00010000 // 0x10


// Offset and sensitivity - defined in electrical characteristics, and TEMP_OUT_H/L of datasheet
const   ICM20948_TEMPERATURE_DEGREES_OFFSET = 21
const   ICM20948_TEMPERATURE_SENSITIVITY = 333.87
const   ICM20948_ROOM_TEMP_OFFSET = 21

const AK09916_I2C_ADDR = 0x0C

const AK09916_WIA2 = 0x01  // ID register
const   AK09916_CHIP_ID = 0x09 // expected ID

const AK09916_ST1 = 0x10
const   AK09916_ST1_DOR  = 0b00000010   // Data overflow bit
const   AK09916_ST1_DRDY = 0b00000001  // Data ready bit
const AK09916_HXL = 0x11 // first of 12 bytes of mag data (X-low byte)
const AK09916_ST2 = 0x18  // after sampling, read this to unlock next sample
const   AK09916_ST2_HOFL = 0b00001000  // Magnetic sensor overflow bit
const AK09916_CNTL2 = 0x31
const   AK09916_CNTL2_MODE    = 0b00001111
const   AK09916_CNTL2_MODE_OFF    = 0x00
const   AK09916_CNTL2_MODE_SINGLE = 0x01 // one-shot
const   AK09916_CNTL2_MODE_CONT1_10HZ = 0x02 // 10 Hz
const   AK09916_CNTL2_MODE_CONT2_20Hz = 0x04 // 20 Hz
const   AK09916_CNTL2_MODE_CONT3_50Hz = 0x06 // 50 Hz
const   AK09916_CNTL2_MODE_CONT4_100Hz = 0x08 // 100 Hz
const   AK09916_CNTL2_MODE_TEST = 0b00010000
const AK09916_CNTL3 = 0x32

// high-level flags in ICM20948.status
const STATUS_ICM_FOUND = 0b10000000
const STATUS_MAG_FOUND = 0b01000000

class ICM20948 {
    icm: number // I2C address of this ICM20948 chip
    mag: number // I2C address of AK09916 sub-chip
    magIsDirect: boolean // true when AK09916 being accessed directly

    //i2cAddress:number  // current target for I2C commands
    registerBank: number // currently-selected register bank
    status: number  // flags indicating current status of the chip

    /** create an ICM20948 instance */
    constructor(icmAddress: number, magDirect:boolean) {
        this.registerBank = -1 // currently-selected register-bank
        this.icm = icmAddress // I2C master address of ICM20948 chip
        this.mag = AK09916_I2C_ADDR // I2C address of AK09916 sub-chip
        this.status = 0 // (awaiting initialisation)

        // *** Before trying anything, reset the chip:
        this.useBank(0)
        // set the ICM_PWR_MGMT_1_RESET bit in ICM_PWR_MGMT_1 register
        i2cRegisterFlags(this.icm, ICM20948_PWR_MGMT_1, 0, ICM20948_PWR_MGMT_1_RESET)
        pause(100)

        // now wake it up and prepare for use
        this.initialise()
        
        // *** Am I really there?
        this.checkForICM20948()


        /* Set up the gyro and accelerometer
        this.setGyroSampleRate(100)
        this.setGyroSmoothing(true, 5)
        this.setGyroSensitivity(250)

        this.setAccelSampleRate(125)
        this.setAccelSmoothing(true, 5)
        this.setAccelSensitivity(16)

        */

        // initialise with defaults...
        this.setAccelSampleRate()
        this.setAccelSensitivity()
        this.setAccelSmoothing()
        this.setGyroSampleRate()
        this.setGyroSensitivity()
        this.setGyroSmoothing()

        if (magDirect) {
            this.useMagDirect() // address magnetometer directly on the I2C bus
        } else {
            this.useMagSlave() // address magnetometer indirectly via the ICM
        }

        // reset magnetometer
        this.magInitialise()

        // is AK09916 sub-chip listening?
        this.checkForAK09916()

        if ((this.status & STATUS_MAG_FOUND) > 0) {
            basic.showIcon(IconNames.Happy)
            pause(1000)
        }

        // ? clear interrupts
        //i2cWriteByte(this.icm, ICM20948_INT_PIN_CFG, 0x30)
        //basic.pause(10) //time.sleep(0.01)
    }

    /**  Check main ICM Chip ID */
    checkForICM20948() {
        this.useBank(0)
        if (i2cReadByte(this.icm, ICM20948_WHO_AM_I) == ICM20948_CHIP_ID) {
            this.status |= STATUS_ICM_FOUND
            Show.see(mode,"ICM ok")
        } else Show.see(mode,"no ICM")
    }

    /**  Check magnetometer sub-chip ID */
    checkForAK09916() {
        let id = -1
        if (this.magIsDirect) {
            id = i2cReadByte(this.mag, AK09916_WIA2)
        } else {
            // we need a slave read for this register
            id = this.magReadByte(AK09916_WIA2)
        }
        if (id == AK09916_CHIP_ID) {
            this.status |= STATUS_MAG_FOUND
            Show.see(mode,"MAG ok")
        } else Show.see(mode,"no MAG")
    }

    getStatus() {
        return this.status
    }

    /** read and return Accelerometer & Gyro */
    senseIcm() {
        let rdy = 0
    // make sure a reading has been taken (RAW_DATA_0_RDY_INT bit is set)
        while (rdy == 0) {
            rdy = i2cReadByte(this.icm, ICM20948_INT_STATUS_1) & 0x01
            Show.see(mode,"?")
        }

    // latest Accelerometer and Gyro readings are parked in the output space
        this.useBank(0)

        this.dumpRegisters(0)

        let byteArray = i2cReadData(ICM20948_ACCEL_XOUT_H, 12)

        
        // dissect these 12 bytes into six big-endian 16-bit readings
        let vals = [] 
        for (let i=0; i<12; i+=2) {
            let val =  (byteArray[i]<<8) | byteArray[i+1]
            //Show.see(i + ':' + val)
            vals.push(val)
        }

        // Rescale the raw readings...
        // Read accelerometer full scale range setting
        this.useBank(2)
        let range = (i2cReadByte(this.icm, ICM20948_ACCEL_CONFIG) & 0x06) >> 1

        // (scale ranges taken from section 3.2 of the datasheet)
        // 0xFFFF =  [  2g,     4g,     8g      16g  ] 

        let scale = [16384.0, 8192.0, 4096.0, 2048.0][range]
        vals[0] /= scale
        vals[1] /= scale
        vals[2] /= scale

        // Read back the spin-rate range setting and
        // use it to compensate the reading to dps
        range = (i2cReadByte(this.icm, ICM20948_GYRO_CONFIG_1) & 0x06) >> 1

        // (scale ranges taken from section 3.1 of the datasheet)
        // 0xFFFF =     [250, 500, 1000, 2000] dps
        scale = [131, 65.5, 32.8, 16.4][range]

        vals[3] /= scale
        vals[4] /= scale
        vals[5] /= scale

        return vals
    }

    senseMag(timeout = 1.0) {
        /* 

        self.mag_write(AK09916_CNTL2, 0x01)  # Trigger single measurement
        t_start = time.time()
        while not self.magnetometer_ready():
            if time.time() - t_start > timeout:
                raise RuntimeError("Timeout waiting for Magnetometer Ready")
            time.sleep(0.00001)

        data = self.mag_read_bytes(AK09916_HXL, 6)

        */
        this.magWriteByte(AK09916_CNTL2, 0x01)  // Trigger a single measurement
        let t_start = control.millis()
        let data:Buffer
        while (!this.magIsReady()) {
            if (control.millis() - t_start > timeout) {
                serial.writeLine('Timeout waiting for Magnetometer Ready')
                break
            }
            control.waitMicros(10) //time.sleep(0.00001)
        }
        let byteArray = this.readMagData(AK09916_HXL, 6)

        // Read ST2 to inform chip that read finished,
        // (needed in continuous modes to unlock next sample)
        this.readMagByte(AK09916_ST2)

        // dissect these 6 bytes into 3 big-endian 16-bit readings
        let vals = []
        for (let i = 0; i < 6; i += 2) {
            let val = (byteArray[i] << 8) | byteArray[i + 1]
            // Scale raw values by 0.15, giving magnetic flux density "uT"
            // (see) section 3.3 of the datasheet)
            //Show.see(i + ':' + val * 0.15)
            vals.push(val)
        }

        return vals
    }

    magIsReady() {
        /* Check the magnetometer status ready bit. */
        return ((this.readMagByte(AK09916_ST1) & AK09916_ST1_DRDY) > 0)
    }

    setAccelSampleRate(rate = 125) {
        /* Set the accelerometer sample rate in Hz. */
        // 125Hz - 1.125 kHz / (1 + rate)
        //rate = Number((1125.0 / rate) - 1)
        rate = (1125.0 / rate) - 1
        // TODO maybe use struct to pack and then this.write_bytes
        this.useBank(2)
        i2cWriteByte(this.icm, ICM20948_ACCEL_SMPLRT_DIV_1, (rate >> 8) & 0xff)
        i2cWriteByte(this.icm, ICM20948_ACCEL_SMPLRT_DIV_2, rate & 0xff)
    }

    setAccelSensitivity(scale = 16) {
        /* Set the accelerometer full scale range to +- the supplied value. */
        // only values allowed are 2g, 4g, 8g, or 16g so round down to the nearest
        // giving range selector = [0,  1,  2,  3]
        let fsBits = 
            (scale < 4)? 0b00:                  // select 2g
                ((scale < 8)? 0b01:             // select 4g
                    ((scale < 16)? 0b10: 0b11)) // select 8g or 16g
        // read config and clear the ACCEL_FS_SEL field
        this.useBank(2)
        let value = i2cReadByte(this.icm, ICM20948_ACCEL_CONFIG) & 0b11111001
        value |= fsBits << 1
        i2cWriteByte(this.icm, ICM20948_ACCEL_CONFIG, value)
    }

    setAccelSmoothing(enabled = true, mode = 5) {
        /* Configure the accelerometer low pass filter. */
        this.useBank(2)
        let value = i2cReadByte(this.icm, ICM20948_ACCEL_CONFIG) & 0b10001110
        if (enabled) {
            value |= 0b1
            value |= (mode & 0x07) << 4
            i2cWriteByte(this.icm, ICM20948_ACCEL_CONFIG, value)
        }
    }

    setGyroSampleRate(rate = 125) {
        /* Set the gyro sample rate in Hz. */
        this.useBank(2)
        // 125Hz sample rate - 1.125 kHz / (1 + rate)
        rate = (1125.0 / rate) - 1
        i2cWriteByte(this.icm, ICM20948_GYRO_SMPLRT_DIV, rate)
    }

    setGyroSensitivity(scale = 250) {
        /* Set the gyro full scale range to +- supplied value. */
        this.useBank(2)
        // read config and clear the GYRO_FS_SEL field
        let value = i2cReadByte(this.icm, ICM20948_GYRO_CONFIG_1) & 0b11111001
        /////value |= { 250:0b00, 500:0b01, 1000:0b10, 2000:0b11 }[scale] << 1
        i2cWriteByte(this.icm, ICM20948_GYRO_CONFIG_1, value)
    }

    setGyroSmoothing(enabled = true, mode = 5) {
        /* Configure the gyro low pass filter. */
        this.useBank(2)
        let value = i2cReadByte(this.icm, ICM20948_GYRO_CONFIG_1) & 0b10001110
        if (enabled) {
            value |= 0b1
        }
        value |= (mode & 0x07) << 4
        i2cWriteByte(this.icm, ICM20948_GYRO_CONFIG_1, value)
    }

    readTemperature() {
        /* Property to read the current IMU temperature */
        // PWR_MGMT_1 defaults to leave temperature enabled
        this.useBank(0)
        let temp_raw_bytes = i2cReadData(ICM20948_TEMP_OUT_H, 2)
        //let temp_raw = struct.unpack('>h', bytearray(temp_raw_bytes))[0]
        let temp_raw = (temp_raw_bytes[0] << 8) + temp_raw_bytes[1]
        let temperature_deg_c = ((temp_raw - ICM20948_ROOM_TEMP_OFFSET) / ICM20948_TEMPERATURE_SENSITIVITY) + ICM20948_TEMPERATURE_DEGREES_OFFSET
        return temperature_deg_c
    }

    /** Initialise various data transfer conditions  */
    initialise() {

        /*

        self.write(ICM20948_PWR_MGMT_1, 0x80)
        time.sleep(0.01)
        self.write(ICM20948_PWR_MGMT_1, 0x01)
        self.write(ICM20948_PWR_MGMT_2, 0x00)

        self.bank(2)

        self.set_gyro_sample_rate(100)
        self.set_gyro_low_pass(enabled=True, mode=5)
        self.set_gyro_full_scale(250)

        self.set_accelerometer_sample_rate(125)
        self.set_accelerometer_low_pass(enabled=True, mode=5)
        self.set_accelerometer_full_scale(16)

        self.bank(0)
        self.write(ICM20948_INT_PIN_CFG, 0x30)

        self.bank(3)
        self.write(ICM20948_I2C_MST_CTRL, 0x4D)
        self.write(ICM20948_I2C_MST_DELAY_CTRL, 0x01)
        */


        this.useBank(0)
        // Set Clock Auto to wake from possible Sleep mode
        i2cWriteByte(this.icm, ICM20948_PWR_MGMT_1, ICM20948_PWR_MGMT_1_CLOCK_AUTO)

        // Make sure we aren't disabling any axes of GYRO or ACCEL
        i2cWriteByte(this.icm, ICM20948_PWR_MGMT_2, 0x00)

        // Configure I2C Master Clock
        this.useBank(3)
        // Set the I2C_MST_CLK field in the bottom 4 bits of I2C_MST_CTRL register
        // (0x07 selects 345.6kHz, with 46.67% duty cycle)
        // Also set the I2C_MST_P_NSR flag, which says: Stop between reads
        i2cWriteByte(this.icm, ICM20948_I2C_MST_CTRL, ICM20948_I2C_MST_CTRL_NSR | 0x07)

        // Configure Output Data-rate alignment
        this.useBank(2)
        i2cWriteByte(this.icm, ICM20948_ODR_ALIGN_EN, 0x01) // Enables ODR start-time alignment

        basic.pause(10)
 
    }


    //********************************** Low-level I/O ********************************* */
    //      (uses I2C access primitives found in pins_extra.ts )

    /** Nominate a register bank */
    useBank(value: number) {
        if (!(this.registerBank == value)) {
            i2cWriteByte(this.icm, ICM20948_BANK_SEL, value << 4) // bank field is top four bits
            this.registerBank = value
        }
    }

    /** set up I2C access to AK09916 magnetometer in Pass-Through mode */
    useMagDirect() {
        this.useBank(0)
        // in the USER_CTRL register, clear the I2C_MST_EN bit
        i2cRegisterFlags(this.icm, ICM20948_USER_CTRL, ICM20948_USER_CTRL_I2C_MST_EN, 0)
        // in the INT_PIN_CFG register, set the BYPASS_EN bit
        i2cRegisterFlags(this.icm, ICM20948_INT_PIN_CFG, 0, ICM20948_INT_PIN_CFG_BYPASS_EN)   
        this.magIsDirect = true
        this.magInitialise()
    }


    /** prepare for I2C access to AK09916 magnetometer in Master-Slave mode */
    useMagSlave() {
        this.useBank(0)
        // in the USER_CTRL register, set the I2C_MST_EN bit
        i2cRegisterFlags(this.icm, ICM20948_USER_CTRL, 0, ICM20948_USER_CTRL_I2C_MST_EN)
        // in the INT_PIN_CFG register, clear the BYPASS_EN bit
        i2cRegisterFlags(this.icm, ICM20948_INT_PIN_CFG, ICM20948_INT_PIN_CFG_BYPASS_EN, 0)
        this.magIsDirect = false
        this.magInitialise()
    }

    /** Reset the magnetometer */
    magInitialise() {

/*
        # Reset the magnetometer
        self.mag_write(AK09916_CNTL3, 0x01)
        while self.mag_read(AK09916_CNTL3) == 0x01:
            time.sleep(0.0001)
*/

        this.magWriteByte(AK09916_CNTL3, 0x01)
        while (this.magReadByte(AK09916_CNTL3) == 0x01) {
            control.waitMicros(100)
        }
        // set operating mode to 50Hz continuous readings
        this.magWriteByte(AK09916_CNTL2, AK09916_CNTL2_MODE_CONT3_50Hz)
        
    }


    // Wrappers to access magnetometer in either mode
    writeMagByte(reg:number, value:number) {
        if(this.magIsDirect) {
            i2cWriteByte(this.mag, reg, value) 
        } else { 
            this.magWriteByte(reg, value)
        }
    }

    readMagByte(reg:number) {
        return this.magIsDirect ? i2cReadByte(this.mag, reg) 
                                : this.magReadByte(reg)
    }

    readMagData(reg:number, length = 1) {
        return this.magIsDirect ? i2cReadData(this.mag, reg, length)
            : this.magReadData(reg, length)
    }
    
    // ************** Magnetometer I/O when using Master-Slave mode ***************

    /**  Write a byte indirectly into a magnetometer register */
    magWriteByte(reg:number, value:number) {
        // Set up a write access using Slave 0 register-set in bank 3
        this.useBank(3)
        i2cWriteByte(this.icm, ICM20948_I2C_SLV0_ADDR, AK09916_I2C_ADDR) // point at AK09916
        i2cWriteByte(this.icm, ICM20948_I2C_SLV0_REG, reg)
        i2cWriteByte(this.icm, ICM20948_I2C_SLV0_DO, value)
        i2cWriteByte(this.icm, ICM20948_I2C_SLV0_CTRL, 0)
        this.magSlaveGo() // initiate indirect transfer
    }

    /** Read a byte from the slave magnetometer */
    magReadByte(reg:number) {
        // Set up a read access using Slave 0 register-set in bank 3
        this.useBank(3)
        i2cWriteByte(this.icm, ICM20948_I2C_SLV0_ADDR, AK09916_I2C_ADDR | ICM20948_I2C_SLV_ADDR_RNW)
        i2cWriteByte(this.icm, ICM20948_I2C_SLV0_REG, reg)
        i2cWriteByte(this.icm, ICM20948_I2C_SLV0_DO, ICM20948_EXT_SLV_SENS_DATA_00)
        i2cWriteByte(this.icm, ICM20948_I2C_SLV0_CTRL, ICM20948_I2C_SLV_CTRL_SLV_ENABLE | 1) // length field says 1 byte only
        this.magSlaveGo() // initiate indirect transfer
        return i2cReadByte(this.icm, ICM20948_EXT_SLV_SENS_DATA_00)
    }

    /** Read up to 24 bytes from the slave magnetometer. */
    magReadData(reg:number, length = 1) {
        // Set up a read access using Slave 0 register-set in bank 3
        this.useBank(3)
        i2cWriteByte(this.icm, ICM20948_I2C_SLV0_ADDR, AK09916_I2C_ADDR | ICM20948_I2C_SLV_ADDR_RNW)
        i2cWriteByte(this.icm, ICM20948_I2C_SLV0_REG, reg)
        i2cWriteByte(this.icm, ICM20948_I2C_SLV0_DO, 0xff) // irrelevant
        i2cWriteByte(this.icm, ICM20948_I2C_SLV0_CTRL, ICM20948_I2C_SLV_CTRL_SLV_ENABLE | length)
        this.magSlaveGo() // initiate indirect transfer
        return i2cReadData(ICM20948_EXT_SLV_SENS_DATA_00, length)
    }

    /*set up slave0 for reading into the bank 0 data registers
    def _setup_mag_readout(self) -> None:
    self._bank = 3
    self._slave0_addr = 0x8C  OK
    sleep(0.005)
    self._slave0_reg = 0x11 == 17 == AK09916_HXL
    sleep(0.005)
    self._slave0_ctrl = 0x89  # enable == 0b 10001001 = SLV_ENABLE + length:9
    sleep(0.005)*/

    /* 

        user = self.read(ICM20948_USER_CTRL)
        self.write(ICM20948_USER_CTRL, user | 0x20)
        time.sleep(0.005)
        self.write(ICM20948_USER_CTRL, user)
    
    */

    /** initiate Slave transfer by setting ICM20948_USER_CTRL_I2C_MST_EN for a while */
    magSlaveGo() {
        this.useBank(0)
        i2cRegisterFlags(this.icm, ICM20948_USER_CTRL, 0, ICM20948_USER_CTRL_I2C_MST_EN)
        // eventually, wait for slave to report data is ready?
        control.waitMicros(5000) // =5ms
        // now unset Master Enable
        i2cRegisterFlags(this.icm, ICM20948_USER_CTRL, ICM20948_USER_CTRL_I2C_MST_EN, 0)
    }


    /** Modify flags in a register in the magnetometer */
    magRegisterFlags(reg:number, unsetMask:number, setMask:number) {
        if (this.magIsDirect) {
            i2cRegisterFlags(this.mag, reg, unsetMask, setMask)
        } else { // use indirect Slave transfers...
            let setting = this.magReadByte(reg)
            setting &= (0xff ^ unsetMask)
            setting |= setMask
            this.magWriteByte(reg, setting)
            control.waitMicros(10)
        }
    }


    dumpRegisters(bank: number) {
        switch (bank) {
            case 0:
                // Bank 0:
                pause(100)
                serial.writeLine("")
                pause(100)
                serial.writeLine("")
                pause(100)
                serial.writeLine("ICM Bank 0 Registers")
                pause(100)
                serial.writeLine("")
                this.useBank(0)
                pause(100)
                serial.writeLine("WHO_AM_I = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_WHO_AM_I)))
                pause(100)
                serial.writeLine("USER_CTRL = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_USER_CTRL)))
                pause(100)
                serial.writeLine("PWR_MGMT_1 = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_PWR_MGMT_1)))
                pause(100)
                serial.writeLine("PWR_MGMT_2 = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_PWR_MGMT_2)))
                pause(100)
                serial.writeLine("INT_PIN_CFG = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_INT_PIN_CFG)))
                pause(100)
                serial.writeLine("ACCEL_SMPLRT_DIV_1 = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_ACCEL_SMPLRT_DIV_1)))
                pause(100)
                serial.writeLine("ACCEL_SMPLRT_DIV_2 = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_ACCEL_SMPLRT_DIV_2)))
                pause(100)
                serial.writeLine("ACCEL_INTEL_CTRL = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_ACCEL_INTEL_CTRL)))
                pause(100)
                serial.writeLine("ACCEL_WOM_THR = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_ACCEL_WOM_THR)))
                pause(100)
                serial.writeLine("ACCEL_CONFIG = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_ACCEL_CONFIG)))
                // serial.writeLine("ACCEL_XOUT_H = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_ACCEL_XOUT_H)))
                this.dumpIcmReadingsBE("ACCEL_XYZ", ICM20948_ACCEL_XOUT_H, 6)
                pause(100)
                // serial.writeLine("GRYO_XOUT_H = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_GRYO_XOUT_H)))
                this.dumpIcmReadingsBE("GYRO_XYZ", ICM20948_GRYO_XOUT_H, 6)
                pause(100)
                serial.writeLine("TEMP_OUT_H = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_TEMP_OUT_H)))
                pause(100)
                serial.writeLine("TEMP_OUT_L = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_TEMP_OUT_L)))
                // serial.writeLine("EXT_SLV_SENS_DATA_XYZ " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_EXT_SLV_SENS_DATA_00)))
                this.dumpIcmReadingsLE("SLAVE_MAG_XYZ", ICM20948_EXT_SLV_SENS_DATA_00, 6)
                pause(100)

                break

            // don't bother with bank 1 !

            case 2:
                // Bank 2:
                pause(100)
                serial.writeLine("")
                pause(100)
                serial.writeLine("")
                pause(100)
                serial.writeLine("ICM Bank 2 Registers")
                pause(100)
                serial.writeLine("")
                this.useBank(2)
                pause(100)
                serial.writeLine("GYRO_SMPLRT_DIV = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_GYRO_SMPLRT_DIV)))
                pause(100)
                serial.writeLine("GYRO_CONFIG_1 = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_GYRO_CONFIG_1)))
                pause(100)
                serial.writeLine("GYRO_CONFIG_1_GYRO_FS_SEL_MASK = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_GYRO_CONFIG_1_GYRO_FS_SEL_MASK)))
                pause(100)
                serial.writeLine("GYRO_CONFIG_1_GYRO_DLPCFCFG_MASK = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_GYRO_CONFIG_1_GYRO_DLPCFCFG_MASK)))
                pause(100)
                serial.writeLine("GYRO_CONFIG_2 = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_GYRO_CONFIG_2)))
                pause(100)
                serial.writeLine("ODR_ALIGN_EN = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_ODR_ALIGN_EN)))
                pause(100)
                serial.writeLine("ACCEL_SMPLRT_DIV_1 = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_ACCEL_SMPLRT_DIV_1)))
                pause(100)
                serial.writeLine("ACCEL_SMPLRT_DIV_2 = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_ACCEL_SMPLRT_DIV_2)))
                pause(100)
                serial.writeLine("ACCEL_INTEL_CTRL = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_ACCEL_INTEL_CTRL)))
                pause(100)
                serial.writeLine("ACCEL_WOM_THR = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_ACCEL_WOM_THR)))
                pause(100)
                serial.writeLine("ACCEL_CONFIG_1 = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_ACCEL_CONFIG_1)))
                pause(100)
                serial.writeLine("ACCEL_CONFIG_1_ACCEL_FS_SEL_MASK = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_ACCEL_CONFIG_1_ACCEL_FS_SEL_MASK)))
                pause(100)
                serial.writeLine("ACCEL_CONFIG_1_ACCEL_DLPFCFG_MASK = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_ACCEL_CONFIG_1_ACCEL_DLPFCFG_MASK)))
                pause(100)
                serial.writeLine("ACCEL_CONFIG_2 = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_ACCEL_CONFIG_2)))
                pause(100)
                serial.writeLine("PRS_ODR_CONFIG = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_PRS_ODR_CONFIG)))
                pause(100)
                serial.writeLine("PRGM_START_ADDRH = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_PRGM_START_ADDRH)))
                pause(100)
                serial.writeLine("PRGM_START_ADDRL = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_PRGM_START_ADDRL)))
                pause(100)
                serial.writeLine("FSYNC_CONFIG = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_FSYNC_CONFIG)))
                pause(100)
                serial.writeLine("TEMP_CONFIG = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_TEMP_CONFIG)))
                pause(100)
                serial.writeLine("MOD_CTRL_USR = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_MOD_CTRL_USR)))
                pause(100)
                serial.writeLine("MOD_CTRL_USR_REG_LP_DMP_EN = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_MOD_CTRL_USR_REG_LP_DMP_EN)))
                pause(100)
                break

            case 3:
                // Bank 3:
                pause(100)
                serial.writeLine("")
                pause(100)
                serial.writeLine("")
                pause(100)
                serial.writeLine("ICM Bank 3 Registers")
                pause(100)
                serial.writeLine("")
                this.useBank(3)
                pause(100)
                serial.writeLine("I2C_MST_ODR_CONFIG = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_I2C_MST_ODR_CONFIG)))
                pause(100)
                serial.writeLine("I2C_MST_CTRL = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_I2C_MST_CTRL)))
                pause(100)
                serial.writeLine("I2C_MST_DELAY_CTRL = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_I2C_MST_DELAY_CTRL)))
                pause(100)
                serial.writeLine("I2C_SLV0_ADDR = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_I2C_SLV0_ADDR)))
                pause(100)
                serial.writeLine("I2C_SLV0_REG = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_I2C_SLV0_REG)))
                pause(100)
                serial.writeLine("I2C_SLV0_CTRL = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_I2C_SLV0_CTRL)))
                pause(100)
                serial.writeLine("I2C_SLV0_DO = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_I2C_SLV0_DO)))
                pause(100)
                serial.writeLine("I2C_SLV1_ADDR = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_I2C_SLV1_ADDR)))
                pause(100)
                serial.writeLine("I2C_SLV1_REG = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_I2C_SLV1_REG)))
                pause(100)
                serial.writeLine("I2C_SLV1_CTRL = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_I2C_SLV1_CTRL)))
                pause(100)
                serial.writeLine("I2C_SLV1_DO = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_I2C_SLV1_DO)))
                pause(100)
                pause(100)
                serial.writeLine("I2C_SLV2_ADDR = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_I2C_SLV2_ADDR)))
                pause(100)
                serial.writeLine("I2C_SLV2_REG = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_I2C_SLV2_REG)))
                pause(100)
                serial.writeLine("I2C_SLV2_CTRL = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_I2C_SLV2_CTRL)))
                pause(100)
                serial.writeLine("I2C_SLV2_DO = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_I2C_SLV2_DO)))
                pause(100)
                serial.writeLine("I2C_SLV3_ADDR = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_I2C_SLV3_ADDR)))
                pause(100)
                serial.writeLine("I2C_SLV3_REG = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_I2C_SLV3_REG)))
                pause(100)
                serial.writeLine("I2C_SLV3_CTRL = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_I2C_SLV3_CTRL)))
                pause(100)
                serial.writeLine("I2C_SLV3_DO = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_I2C_SLV3_DO)))
                pause(100)
                serial.writeLine("I2C_SLV4_ADDR = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_I2C_SLV4_ADDR)))
                pause(100)
                serial.writeLine("I2C_SLV4_REG = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_I2C_SLV4_REG)))
                pause(100)
                serial.writeLine("I2C_SLV4_CTRL = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_I2C_SLV4_CTRL)))
                pause(100)
                serial.writeLine("I2C_SLV4_DO = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_I2C_SLV4_DO)))
                pause(100)
                serial.writeLine("I2C_SLV4_DI = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_I2C_SLV4_DI)))
                pause(100)
                break

            case 4:
                // Magnetometer 
                pause(100)
                serial.writeLine("Magnetometer Registers")
                pause(100)
                serial.writeLine("AK09916_WIA2 = " + toHex(this.readMagByte(AK09916_WIA2)))
                pause(100)
                serial.writeLine("AK09916_ST1 = " + toHex(this.readMagByte(AK09916_ST1)))
                pause(100)
                this.dumpMagReadings("AK09916_HXL...", AK09916_HXL, 6) // sensor data
                pause(100)
                serial.writeLine("AK09916_ST2 = " + toHex(this.readMagByte(AK09916_ST2)))
                pause(100)
                serial.writeLine("AK09916_CNTL2 = " + toHex(this.readMagByte(AK09916_CNTL2)))
                pause(100)
                serial.writeLine("AK09916_CNTL3 = " + toHex(this.readMagByte(AK09916_CNTL3)))
                pause(100)
                break
        }
    }
    /** construct and dump some 2-byte big-endian ICM words */
    dumpIcmReadingsBE(fromName: string, fromReg: number, length: number) {
        for (let i = 0; i < length; i+=2) {
            let hi = toHex(i2cReadByte(ICM20948_I2C_ADDR, fromReg + i))
            let lo = toHex(i2cReadByte(ICM20948_I2C_ADDR, fromReg + i + 1))
            serial.writeLine(fromName + "[" + i + "] = " + hi + lo.substr(2))
        }
    }

    /** construct and dump some 2-byte little-endian ICM words */
    // (used for LE mag data read indirectly, in master-slave mode)
    dumpIcmReadingsLE(fromName: string, fromReg: number, length: number) {
        for (let i = 0; i < length; i += 2) {
            let lo = toHex(i2cReadByte(ICM20948_I2C_ADDR, fromReg + i))
            let hi = toHex(i2cReadByte(ICM20948_I2C_ADDR, fromReg + i + 1))
            serial.writeLine(fromName + "[" + i + "] = " + hi + lo.substr(2))
        }
    }

    /** construct and dump some 2-byte little-endian magnetometer words */
    dumpMagReadings(fromName:string, fromReg:number, length:number){
        for (let i = 0; i < length; i += 2) {
            let lo = toHex(this.readMagByte(fromReg + i))
            let hi = toHex(this.readMagByte(fromReg + i + 1))
            serial.writeLine(fromName + "[" + i + "] = " + hi + lo.substr(2))
        }
    }
}
