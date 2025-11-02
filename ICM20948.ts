
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
const   ICM20948_I2C_MST_CTRL_NSR = 0b00010000 // Stop between reads
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
const   ICM20948_I2C_SLV_ADDR_RNW = 0x80 // set for Read (Not Write)
const   ICM20948_I2C_SLV_CTRL_SLV_ENABLE = 0x80
const   ICM20948_I2C_SLV_CTRL_BYTE_SWAP = 0x40
const   ICM20948_I2C_SLV_CTRL_REG_DIS = 0x20
const   ICM20948_I2C_SLV_CTRL_REG_GROUP = 0x10


// Offset and sensitivity - defined in electrical characteristics, and TEMP_OUT_H/L of datasheet
const   ICM20948_TEMPERATURE_DEGREES_OFFSET = 21
const   ICM20948_TEMPERATURE_SENSITIVITY = 333.87
const   ICM20948_ROOM_TEMP_OFFSET = 21

const AK09916_I2C_ADDR = 0x0C

const AK09916_WIA2 = 0x01  // ID register
const   AK09916_CHIP_ID = 0x09 // expected ID

const AK09916_ST1 = 0x10
const   AK09916_ST1_DOR = 0b00000010   // Data overflow bit
const   AK09916_ST1_DRDY = 0b00000001  // Data ready bit
const AK09916_HXL = 0x11
const AK09916_ST2 = 0x18
const   AK09916_ST2_HOFL = 0b00001000  // Magnetic sensor overflow bit
const AK09916_CNTL2 = 0x31
const   AK09916_CNTL2_MODE = 0b00001111
const   AK09916_CNTL2_MODE_OFF = 0
const   AK09916_CNTL2_MODE_SINGLE = 1
const   AK09916_CNTL2_MODE_CONT1 = 2
const   AK09916_CNTL2_MODE_CONT2 = 4
const   AK09916_CNTL2_MODE_CONT3 = 6
const   AK09916_CNTL2_MODE_CONT4 = 8
const   AK09916_CNTL2_MODE_TEST = 16
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

    constructor(icmAddress: number, magAddress: number) {
        this.registerBank = -1 // currently-selected register-bank
        this.icm = icmAddress // I2C master address of ICM20948 chip
        this.mag = magAddress // I2C address of AK09916 sub-chip
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

        if ((this.status & STATUS_ICM_FOUND) > 0) {
            basic.showIcon(IconNames.Heart)
            pause(1000)
        }

        // try using magnetometer directly
        this.useMagDirect()

        // is AK09916 sub-chip listening?
        this.checkForAK09916()

        if ((this.status & STATUS_MAG_FOUND) > 0) {
            basic.showIcon(IconNames.Happy)
            pause(1000)
        }

        // Reset the magnetometer
        this.magWriteByte(AK09916_CNTL3, 0x01)
        while (this.magReadByte(AK09916_CNTL3) == 0x01) {
            control.waitMicros(100)
        }

        // Set up the gyro and accelerometer
        this.useBank(2)
        this.set_gyro_sample_rate(100)
        this.set_gyro_low_pass(true, 5)
        this.set_gyro_full_scale(250)

        this.set_accelerometer_sample_rate(125)
        this.set_accelerometer_low_pass(true, 5)
        this.set_accelerometer_full_scale(16)

        this.useBank(0)
        basic.pause(10) //time.sleep(0.01)
        i2cWriteByte(this.icm, ICM20948_INT_PIN_CFG, 0x30)
        basic.pause(10) //time.sleep(0.01)


    }

    /**  Check main ICM Chip ID */
    checkForICM20948() {
        this.useBank(0)
        if (i2cReadByte(this.icm, ICM20948_WHO_AM_I) == ICM20948_CHIP_ID) {
            this.status |= STATUS_ICM_FOUND
        }
    }

    /**  Check magnetometer sub-chip ID */
    checkForAK09916() {
        let id = -1
        if (this.magIsDirect) {
            id = i2cReadByte(this.mag, AK09916_WIA2)
            serial.writeLine("AK09916_WIA2 says "+toHex(id))
        } else {
            // we need a slave read for this register
            id = this.magReadByte(AK09916_WIA2)
        }
        if (id == AK09916_CHIP_ID) {
            this.status |= STATUS_MAG_FOUND
        }
    }

    getStatus() {
        return this.status
    }

    read_magnetometer_data(timeout = 1.0) {
        this.magWriteByte(AK09916_CNTL2, 0x01)  // Trigger a single measurement
        let t_start = control.millis()
        let data: Buffer
        while (!this.magIsReady()) {
            if (control.millis() - t_start > timeout) {
                /////throw RuntimeError('Timeout waiting for Magnetometer Ready')
                control.waitMicros(10) //time.sleep(0.00001)
            }
            data = this.magReadData(AK09916_HXL, 6)
        }
        // Read ST2 to confirm read finished,
        // needed for continuous modes
        // mag_this.read(AK09916_ST2)

        //////x, y, z = struct.unpack('<hhh', bytearray(data))
        let x = data.getNumber(NumberFormat.UInt16LE, 0)
        let y = data.getNumber(NumberFormat.UInt16LE, 2)
        let z = data.getNumber(NumberFormat.UInt16LE, 4)

        // Scale for magnetic flux density "uT"
        // from section 3.3 of the datasheet
        // This value is constant
        x *= 0.15
        y *= 0.15
        z *= 0.15

        return [x, y, z]
    }

    magIsReady() {
        /* Check the magnetometer status ready bit. */
        return (this.magReadByte(AK09916_ST1) & 0x01) > 0
    }


    read_accelerometer_gyro_data() {
        this.useBank(0)
        let data = i2cReadData(ICM20948_ACCEL_XOUT_H, 12)
        //ax, ay, az, gx, gy, gz = struct.unpack('>hhhhhh', bytearray(data))
        //dissect 12 bytes into 6 words
        let ax = data.getNumber(NumberFormat.UInt16LE, 0)
        let ay = data.getNumber(NumberFormat.UInt16LE, 2)
        let az = data.getNumber(NumberFormat.UInt16LE, 4)
        let gx = data.getNumber(NumberFormat.UInt16LE, 6)
        let gy = data.getNumber(NumberFormat.UInt16LE, 8)
        let gz = data.getNumber(NumberFormat.UInt16LE, 10)

        this.useBank(2)

        // Read accelerometer full scale range and
        // use it to compensate the reading to gs
        let scale = (i2cReadByte(this.icm, ICM20948_ACCEL_CONFIG) & 0x06) >> 1

        // scale ranges from section 3.2 of the datasheet
        let gs = [16384.0, 8192.0, 4096.0, 2048.0][scale]

        ax /= gs
        ay /= gs
        az /= gs

        // Read back the degrees per second rate and
        // use it to compensate the reading to dps
        scale = (i2cReadByte(this.icm, ICM20948_GYRO_CONFIG_1) & 0x06) >> 1

        // scale ranges from section 3.1 of the datasheet
        let dps = [131, 65.5, 32.8, 16.4][scale]

        gx /= dps
        gy /= dps
        gz /= dps

        return [ax, ay, az, gx, gy, gz]
    }

    set_accelerometer_sample_rate(rate = 125) {
        /* Set the accelerometer sample rate in Hz. */
        this.useBank(2)
        // 125Hz - 1.125 kHz / (1 + rate)
        //rate = Number((1125.0 / rate) - 1)
        rate = (1125.0 / rate) - 1
        // TODO maybe use struct to pack and then this.write_bytes
        i2cWriteByte(this.icm, ICM20948_ACCEL_SMPLRT_DIV_1, (rate >> 8) & 0xff)
        i2cWriteByte(this.icm, ICM20948_ACCEL_SMPLRT_DIV_2, rate & 0xff)
    }

    set_accelerometer_full_scale(scale = 16) {
        /* Set the accelerometer fulls cale range to +- the supplied value. */
        this.useBank(2)
        let value = i2cReadByte(this.icm, ICM20948_ACCEL_CONFIG) & 0b11111001
        ///////value |= { 2:0b00, 4:0b01, 8:0b10, 16:0b11 }[scale] << 1
        i2cWriteByte(this.icm, ICM20948_ACCEL_CONFIG, value)
    }

    set_accelerometer_low_pass(enabled = true, mode = 5) {
        /* Configure the accelerometer low pass filter. */
        this.useBank(2)
        let value = i2cReadByte(this.icm, ICM20948_ACCEL_CONFIG) & 0b10001110
        if (enabled) {
            value |= 0b1
            value |= (mode & 0x07) << 4
            i2cWriteByte(this.icm, ICM20948_ACCEL_CONFIG, value)
        }
    }

    set_gyro_sample_rate(rate = 125) {
        /* Set the gyro sample rate in Hz. */
        this.useBank(2)
        // 125Hz sample rate - 1.125 kHz / (1 + rate)
        rate = (1125.0 / rate) - 1
        i2cWriteByte(this.icm, ICM20948_GYRO_SMPLRT_DIV, rate)
    }

    set_gyro_full_scale(scale = 250) {
        /* Set the gyro full scale range to +- supplied value. */
        this.useBank(2)
        let value = i2cReadByte(this.icm, ICM20948_GYRO_CONFIG_1) & 0b11111001
        /////value |= { 250:0b00, 500:0b01, 1000:0b10, 2000:0b11 }[scale] << 1
        i2cWriteByte(this.icm, ICM20948_GYRO_CONFIG_1, value)
    }

    set_gyro_low_pass(enabled = true, mode = 5) {
        /* Configure the gyro low pass filter. */
        this.useBank(2)
        let value = i2cReadByte(this.icm, ICM20948_GYRO_CONFIG_1) & 0b10001110
        if (enabled) {
            value |= 0b1
        }
        value |= (mode & 0x07) << 4
        i2cWriteByte(this.icm, ICM20948_GYRO_CONFIG_1, value)
    }

    read_temperature() {
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


    //********************************** Lowest-level I/O ********************************* */

    useMagDirect() {
        /** set up I2C access to AK09916 magnetometer in Pass-Through mode */
        this.useBank(0)
        // in the USER_CTRL register, clear the I2C_MST_EN bit
        i2cRegisterFlags(this.icm, ICM20948_USER_CTRL, ICM20948_USER_CTRL_I2C_MST_EN, 0)
        // in the INT_PIN_CFG register, set the BYPASS_EN bit
        i2cRegisterFlags(this.icm, ICM20948_INT_PIN_CFG, 0, ICM20948_INT_PIN_CFG_BYPASS_EN)   
        this.magIsDirect = true
    }


    useMagSlave() {
        /** prepare for I2C access to AK09916 magnetometer in Master-Slave mode */
        this.useBank(0)
        // in the USER_CTRL register, set the I2C_MST_EN bit
        i2cRegisterFlags(this.icm, ICM20948_USER_CTRL, 0, ICM20948_USER_CTRL_I2C_MST_EN)
        // in the INT_PIN_CFG register, clear the BYPASS_EN bit
        i2cRegisterFlags(this.icm, ICM20948_INT_PIN_CFG, ICM20948_INT_PIN_CFG_BYPASS_EN, 0)
        this.magIsDirect = false
    }

    /** Nominate a register bank */
    useBank(value: number) {
        if (!(this.registerBank == value)) {
            i2cWriteByte(this.icm, ICM20948_BANK_SEL, value << 4) // bank field is top four bits
            this.registerBank = value
        }
    }

    magWriteByte(reg: number, value: number) {
        /**  Write a byte indirectly to a magnetometer register */
        // Set up a write access using Slave 0 register-set in bank 3
        this.useBank(3)
        i2cWriteByte(this.icm, ICM20948_I2C_SLV0_ADDR, AK09916_I2C_ADDR) // point at AK09916
        i2cWriteByte(this.icm, ICM20948_I2C_SLV0_REG, reg)
        i2cWriteByte(this.icm, ICM20948_I2C_SLV0_DO, value)
        this.useBank(0)

        this.magSlaveGo()

    }

    magReadByte(reg: number) {
        /** Read a byte from the slave magnetometer. */
        // Set up a read access using Slave 0 register-set in bank 3
        this.useBank(3)
        i2cWriteByte(this.icm, ICM20948_I2C_SLV0_ADDR, AK09916_I2C_ADDR | ICM20948_I2C_SLV_ADDR_RNW)
        i2cWriteByte(this.icm, ICM20948_I2C_SLV0_REG, reg)
        i2cWriteByte(this.icm, ICM20948_I2C_SLV0_DO, ICM20948_EXT_SLV_SENS_DATA_00)

        this.useBank(0)
        this.magSlaveGo()

        return i2cReadByte(this.icm, ICM20948_EXT_SLV_SENS_DATA_00)
    }

    magReadData(reg: number, length = 1) {
        /** Read up to 24 bytes from the slave magnetometer. */
        this.useBank(3)
        i2cWriteByte(this.icm, ICM20948_I2C_SLV0_CTRL, 0x80 | 0x08 | length)
        i2cWriteByte(this.icm, ICM20948_I2C_SLV0_ADDR, AK09916_I2C_ADDR | ICM20948_I2C_SLV_ADDR_RNW)
        i2cWriteByte(this.icm, ICM20948_I2C_SLV0_REG, reg)
        i2cWriteByte(this.icm, ICM20948_I2C_SLV0_DO, ICM20948_EXT_SLV_SENS_DATA_00)
        this.useBank(0)
        this.magSlaveGo()

        return i2cReadData(ICM20948_EXT_SLV_SENS_DATA_00, length)
    }

    magSlaveGo() {
        /** initiate Slave transfer by setting ICM20948_USER_CTRL_I2C_MST_EN for a while */
        i2cRegisterFlags(this.icm, ICM20948_USER_CTRL, 0, ICM20948_USER_CTRL_I2C_MST_EN)
        // eventually, wait for slave to report data is ready?
        control.waitMicros(5000) // =5ms
        i2cRegisterFlags(this.icm, ICM20948_USER_CTRL, ICM20948_USER_CTRL_I2C_MST_EN, 0)
    }


    /** Modify flags in a register in the magnetometer */
    magRegisterFlags(register: number, unsetMask: number, setMask: number) {
        if (this.magIsDirect) {
            i2cRegisterFlags(this.mag, register, unsetMask, setMask)
        } else { // use indirect Slave transfers...
            let setting = this.magReadByte(register)
            setting &= (0xff ^ unsetMask)
            setting |= setMask
            this.magWriteByte(register, setting)
            control.waitMicros(10)
        }
    }


    dumpRegisters(bank: number) {
        switch (bank) {
            case 0:
                // Bank 0:
                this.useBank(0)
                serial.writeLine("WHO_AM_I = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_WHO_AM_I)))
                serial.writeLine("USER_CTRL = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_USER_CTRL)))
                serial.writeLine("PWR_MGMT_1 = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_PWR_MGMT_1)))
                serial.writeLine("PWR_MGMT_2 = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_PWR_MGMT_2)))
                serial.writeLine("INT_PIN_CFG = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_INT_PIN_CFG)))
                serial.writeLine("ACCEL_SMPLRT_DIV_1 = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_ACCEL_SMPLRT_DIV_1)))
                serial.writeLine("ACCEL_SMPLRT_DIV_2 = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_ACCEL_SMPLRT_DIV_2)))
                serial.writeLine("ACCEL_INTEL_CTRL = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_ACCEL_INTEL_CTRL)))
                serial.writeLine("ACCEL_WOM_THR = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_ACCEL_WOM_THR)))
                serial.writeLine("ACCEL_CONFIG = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_ACCEL_CONFIG)))
                serial.writeLine("ACCEL_XOUT_H = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_ACCEL_XOUT_H)))
                serial.writeLine("GRYO_XOUT_H = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_GRYO_XOUT_H)))
                serial.writeLine("TEMP_OUT_H = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_TEMP_OUT_H)))
                serial.writeLine("TEMP_OUT_L = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_TEMP_OUT_L)))
                serial.writeLine("EXT_SLV_SENS_DATA_00 = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_EXT_SLV_SENS_DATA_00)))
                break

            // don't bother with bank 1 !

            case 2:
                // Bank 2:
                this.useBank(2)
                serial.writeLine("GYRO_SMPLRT_DIV = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_GYRO_SMPLRT_DIV)))
                serial.writeLine("GYRO_CONFIG_1 = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_GYRO_CONFIG_1)))
                serial.writeLine("GYRO_CONFIG_1_GYRO_FS_SEL_MASK = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_GYRO_CONFIG_1_GYRO_FS_SEL_MASK)))
                serial.writeLine("GYRO_CONFIG_1_GYRO_DLPCFCFG_MASK = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_GYRO_CONFIG_1_GYRO_DLPCFCFG_MASK)))
                serial.writeLine("GYRO_CONFIG_2 = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_GYRO_CONFIG_2)))
                serial.writeLine("ODR_ALIGN_EN = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_ODR_ALIGN_EN)))
                serial.writeLine("ACCEL_SMPLRT_DIV_1 = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_ACCEL_SMPLRT_DIV_1)))
                serial.writeLine("ACCEL_SMPLRT_DIV_2 = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_ACCEL_SMPLRT_DIV_2)))
                serial.writeLine("ACCEL_INTEL_CTRL = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_ACCEL_INTEL_CTRL)))
                serial.writeLine("ACCEL_WOM_THR = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_ACCEL_WOM_THR)))
                serial.writeLine("ACCEL_CONFIG_1 = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_ACCEL_CONFIG_1)))
                serial.writeLine("ACCEL_CONFIG_1_ACCEL_FS_SEL_MASK = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_ACCEL_CONFIG_1_ACCEL_FS_SEL_MASK)))
                serial.writeLine("ACCEL_CONFIG_1_ACCEL_DLPFCFG_MASK = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_ACCEL_CONFIG_1_ACCEL_DLPFCFG_MASK)))
                serial.writeLine("ACCEL_CONFIG_2 = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_ACCEL_CONFIG_2)))
                serial.writeLine("PRS_ODR_CONFIG = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_PRS_ODR_CONFIG)))
                serial.writeLine("PRGM_START_ADDRH = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_PRGM_START_ADDRH)))
                serial.writeLine("PRGM_START_ADDRL = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_PRGM_START_ADDRL)))
                serial.writeLine("FSYNC_CONFIG = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_FSYNC_CONFIG)))
                serial.writeLine("TEMP_CONFIG = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_TEMP_CONFIG)))
                serial.writeLine("MOD_CTRL_USR = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_MOD_CTRL_USR)))
                serial.writeLine("MOD_CTRL_USR_REG_LP_DMP_EN = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_MOD_CTRL_USR_REG_LP_DMP_EN)))
                break

            case 3:
                // Bank 3:
                this.useBank(3)
                serial.writeLine("I2C_MST_ODR_CONFIG = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_I2C_MST_ODR_CONFIG)))
                serial.writeLine("I2C_MST_CTRL = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_I2C_MST_CTRL)))
                serial.writeLine("I2C_MST_DELAY_CTRL = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_I2C_MST_DELAY_CTRL)))
                serial.writeLine("I2C_SLV0_ADDR = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_I2C_SLV0_ADDR)))
                serial.writeLine("I2C_SLV0_REG = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_I2C_SLV0_REG)))
                serial.writeLine("I2C_SLV0_CTRL = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_I2C_SLV0_CTRL)))
                serial.writeLine("I2C_SLV0_DO = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_I2C_SLV0_DO)))
                serial.writeLine("I2C_SLV1_ADDR = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_I2C_SLV1_ADDR)))
                serial.writeLine("I2C_SLV1_REG = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_I2C_SLV1_REG)))
                serial.writeLine("I2C_SLV1_CTRL = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_I2C_SLV1_CTRL)))
                serial.writeLine("I2C_SLV1_DO = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_I2C_SLV1_DO)))
                serial.writeLine("I2C_SLV2_ADDR = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_I2C_SLV2_ADDR)))
                serial.writeLine("I2C_SLV2_REG = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_I2C_SLV2_REG)))
                serial.writeLine("I2C_SLV2_CTRL = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_I2C_SLV2_CTRL)))
                serial.writeLine("I2C_SLV2_DO = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_I2C_SLV2_DO)))
                serial.writeLine("I2C_SLV3_ADDR = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_I2C_SLV3_ADDR)))
                serial.writeLine("I2C_SLV3_REG = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_I2C_SLV3_REG)))
                serial.writeLine("I2C_SLV3_CTRL = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_I2C_SLV3_CTRL)))
                serial.writeLine("I2C_SLV3_DO = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_I2C_SLV3_DO)))
                serial.writeLine("I2C_SLV4_ADDR = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_I2C_SLV4_ADDR)))
                serial.writeLine("I2C_SLV4_REG = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_I2C_SLV4_REG)))
                serial.writeLine("I2C_SLV4_CTRL = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_I2C_SLV4_CTRL)))
                serial.writeLine("I2C_SLV4_DO = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_I2C_SLV4_DO)))
                serial.writeLine("I2C_SLV4_DI = " + toHex(i2cReadByte(ICM20948_I2C_ADDR, ICM20948_I2C_SLV4_DI)))
                break

            case 4:
                // Magnetometer:
                serial.writeLine("AK09916_WIA2 = " + toHex(i2cReadByte(AK09916_I2C_ADDR, AK09916_WIA2)))
                serial.writeLine("AK09916_ST1 = " + toHex(i2cReadByte(AK09916_I2C_ADDR, AK09916_ST1)))
                serial.writeLine("AK09916_HXL = " + toHex(i2cReadByte(AK09916_I2C_ADDR, AK09916_HXL)))
                serial.writeLine("AK09916_ST2 = " + toHex(i2cReadByte(AK09916_I2C_ADDR, AK09916_ST2)))
                serial.writeLine("AK09916_CNTL2 = " + toHex(i2cReadByte(AK09916_I2C_ADDR, AK09916_CNTL2)))
                serial.writeLine("AK09916_CNTL3 = " + toHex(i2cReadByte(AK09916_I2C_ADDR, AK09916_CNTL3)))
                break
        }
    }
}
