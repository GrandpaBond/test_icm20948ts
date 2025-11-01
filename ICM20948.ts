
// TypeScript driver for Microbit (inspired by https://github.com/pimoroni/icm20948-python)
// (Also drawing insights from https://github.com/dobodu/ICM20948_DMP_Micropython/blob/main/icm20948.py)

//namespace ICM {
const ICM20948_BANK_SEL = 0x7f;

// Bank 0
const ICM20948_WHO_AM_I = 0x00; // ID register
    const ICM20948_CHIP_ID = 0xEA; // ID value expected
const ICM20948_USER_CTRL = 0x03;
    const ICM20948_USER_CTRL_DMP_EN      = 0b10000000
    const ICM20948_USER_CTRL_FIFO_EN     = 0b01000000
    const ICM20948_USER_CTRL_I2C_MST_EN  = 0b00100000
    const ICM20948_USER_CTRL_I2C_IF_DIS  = 0b00010000
    const ICM20948_USER_CTRL_DMP_RST     = 0b00001000
    const ICM20948_USER_CTRL_SRAM_RST    = 0b00000100
    const ICM20948_USER_CTRL_I2C_MST_RST = 0b00000010
const ICM20948_PWR_MGMT_1 = 0x06;
    const ICM20948_PWR_MGMT_1_RESET = 0x80
const ICM20948_PWR_MGMT_1_CLOCK_AUTO = 0x01
const ICM20948_PWR_MGMT_2 = 0x07;
const ICM20948_INT_PIN_CFG = 0x0F;
    const ICM20948_INT_PIN_CFG_BYPASS_EN = 0b00000010

//const ICM20948_ACCEL_SMPLRT_DIV_1 = 0x10;
//const ICM20948_ACCEL_SMPLRT_DIV_2 = 0x11;
//const ICM20948_ACCEL_INTEL_CTRL = 0x12;
//const ICM20948_ACCEL_WOM_THR = 0x13;
const ICM20948_ACCEL_CONFIG = 0x14;
const ICM20948_ACCEL_XOUT_H = 0x2D;
const ICM20948_GRYO_XOUT_H = 0x33;

const ICM20948_TEMP_OUT_H = 0x39;
const ICM20948_TEMP_OUT_L = 0x3A;

// Bank 2
const ICM20948_GYRO_SMPLRT_DIV = 0x00
const ICM20948_GYRO_CONFIG_1 = 0x01
const ICM20948_GYRO_CONFIG_1_GYRO_FS_SEL_MASK = 0b11111001
const ICM20948_GYRO_CONFIG_1_GYRO_DLPCFCFG_MASK = 0b10001110
const ICM20948_GYRO_CONFIG_2 = 0x02
const ICM20948_ODR_ALIGN_EN = 0x09
const ICM20948_ACCEL_SMPLRT_DIV_1 = 0x10
const ICM20948_ACCEL_SMPLRT_DIV_2 = 0x11
const ICM20948_ACCEL_INTEL_CTRL = 0x12
const ICM20948_ACCEL_WOM_THR = 0x13
const ICM20948_ACCEL_CONFIG_1 = 0x14
const ICM20948_ACCEL_CONFIG_1_ACCEL_FS_SEL_MASK = 0b11111001
const ICM20948_ACCEL_CONFIG_1_ACCEL_DLPFCFG_MASK = 0b10001110
const ICM20948_ACCEL_CONFIG_2 = 0x15
const ICM20948_PRS_ODR_CONFIG = 0x20
const ICM20948_PRGM_START_ADDRH = 0x50
const ICM20948_PRGM_START_ADDRL = 0x51
const ICM20948_FSYNC_CONFIG = 0x52
const ICM20948_TEMP_CONFIG = 0x53
const ICM20948_MOD_CTRL_USR = 0x54
const ICM20948_MOD_CTRL_USR_REG_LP_DMP_EN = 0x01

// Bank 3
const ICM20948_I2C_MST_ODR_CONFIG = 0x00
const ICM20948_I2C_MST_CTRL = 0x01
    const ICM20948_I2C_MST_CTRL_MULTI = 0b10000000 //Multi master
    const ICM20948_I2C_MST_CTRL_NSR   = 0b00010000 //Stop between reads
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
const ICM20948_I2C_SLV_ADDR_RNW = 0x80 // set for Read (Not Write)
const ICM20948_I2C_SLV_CTRL_SLV_ENABLE = 0x80
const ICM20948_I2C_SLV_CTRL_BYTE_SWAP = 0x40
const ICM20948_I2C_SLV_CTRL_REG_DIS = 0x20
const ICM20948_I2C_SLV_CTRL_REG_GROUP = 0x10


// Offset and sensitivity - defined in electrical characteristics, and TEMP_OUT_H/L of datasheet
const ICM20948_TEMPERATURE_DEGREES_OFFSET = 21;
const ICM20948_TEMPERATURE_SENSITIVITY = 333.87;
const ICM20948_ROOM_TEMP_OFFSET = 21;

const AK09916_I2C_ADDR = 0x0c;

const AK09916_WIA2 = 0x01;  // ID register
    const AK09916_CHIP_ID = 0x09; // expected ID

const AK09916_ST1 = 0x10;
    const AK09916_ST1_DOR = 0b00000010   // Data overflow bit
    const AK09916_ST1_DRDY = 0b00000001  // Data ready bit
const AK09916_HXL = 0x11;
const AK09916_ST2 = 0x18;
    const AK09916_ST2_HOFL = 0b00001000  // Magnetic sensor overflow bit
const AK09916_CNTL2 = 0x31;
    const AK09916_CNTL2_MODE = 0b00001111;
    const AK09916_CNTL2_MODE_OFF = 0;
    const AK09916_CNTL2_MODE_SINGLE = 1;
    const AK09916_CNTL2_MODE_CONT1 = 2;
    const AK09916_CNTL2_MODE_CONT2 = 4;
    const AK09916_CNTL2_MODE_CONT3 = 6;
    const AK09916_CNTL2_MODE_CONT4 = 8;
    const AK09916_CNTL2_MODE_TEST = 16;
const AK09916_CNTL3 = 0x32;

// high-level flags in ICM20948.status
const STATUS_ICM_FOUND = 0b10000000
const STATUS_MAG_FOUND = 0b01000000


const ICM20948_EXT_SLV_SENS_DATA_00 = 0x3B; // slave 0 is magnetometer; this is where to read its data

class ICM20948 {
    icmAddress:number // I2C address of this ICM20948 chip
    magAddress:number // I2C address of AK09916 sub-chip
    magIsDirect: boolean // true when AK09916 being accessed directly

    i2cAddress:number  // current target for I2C commands
    registerBank:number // currently-selected register bank
    status:number  // flags indicating current status of the chip

    constructor(icmAddress:number, magAddress:number) {
        this.registerBank = -1; // currently-selected register-bank
        this.icmAddress = icmAddress; // I2C master address of ICM20948 chip
        this.magAddress = magAddress; // I2C master address of AK09916 sub-chip
        this.status = 0 // (awaiting initialisation)

        // *** Before trying anything, reset the chip:
        this.useBank(0)
        // set the ICM_PWR_MGMT_1_RESET bit in ICM_PWR_MGMT_1 register
        this.registerFlags(ICM20948_PWR_MGMT_1, 0, ICM20948_PWR_MGMT_1_RESET)
        pause(100)

        // *** Am I there?
        this.checkForICM20948()  

        if ((this.status & STATUS_ICM_FOUND) > 0){
            basic.showIcon(IconNames.Heart)
            pause(1000)
        }
        /*let setting = this.readByte(ICM20948_PWR_MGMT_1)
        setting |= ICM20948_PWR_MGMT_1_RESET
        this.writeByte(ICM20948_PWR_MGMT_1, setting); 
        basic.pause(10) //time.sleep(0.01);
        */

        // Set Clock Auto
        this.writeByte(ICM20948_PWR_MGMT_1, ICM20948_PWR_MGMT_1_CLOCK_AUTO);

        // Don't disable any axes of GYRO or ACCEL
        this.writeByte(ICM20948_PWR_MGMT_2, 0x00);

        // Configure I2C Master Clock
        this.useBank(3);
        this.writeByte(ICM20948_I2C_MST_CTRL, ICM20948_I2C_MST_CTRL_NSR | 0x07)
        //     NSR says:Stop between reads; 0x07 selects 345.6kHzz with 46.67% duty cycle

        // Activate I2C Master
        this.useBank(0);
        this.writeByte(ICM20948_USER_CTRL, 0x20) // bit 0x20 says:I2C_MST_EN (I2C Master Enabled)

        // Configure Output Data-rate
        this.useBank(2);
        this.writeByte(ICM20948_ODR_ALIGN_EN, 0x01) // Enables ODR start-time alignment

    /*
        /*Check if we can access Magnetometer
        # enabling Slave 0 (the internal AK09916) Read AK_WIA2 through AK_I2C_ADD
        # reading result through ICM_EXT_SLV_SENS_DATA_00
    
        // self.slave_config(0,     AK_I2C_ADDR, AK_WIA2, 1,      True, True, False, False, False)
        //                   slave, addr,        reg,     length, RnW,  En,   Swp,   Dis,   Grp, DO = None

        let slv_addr = ICM20948_I2C_SLV0_ADDR | ICM20948_I2C_SLV_ADDR_RNW   // where to place data00 (allowing R/W)
        let slv_reg = ICM20948_I2C_SLV0_REG                                 // which register to poll
        let slv_ctrl = ICM20948_I2C_SLV_CTRL_SLV_ENABLE | 1                 // length = 1 byte (with enable bit set)
        //let slv_do = ICM20948_I2C_SLV0_DO                                 // (no data output being requested here)


        this.selectBank(3);
        this.write(ICM20948_I2C_SLV0_ADDR, slv_addr)    // targeting slave0 address,
        this.write(ICM20948_I2C_SLV0_REG, AK09916_WIA2) // ask for "Who am I" register
        this.write(ICM20948_I2C_SLV0_CTRL, slv_ctrl)    // go do it!
        */

        /*Check if we can access Magnetometer
        # enabling Slave 4, Read AK_WIA2 through AK_I2C_ADD
        # reading result through ICM_EXT_SLV_SENS_DATA_00
        */


        // self.slave_config(4,     AK_I2C_ADDR, AK_WIA2, 1,      True, True, False, False, False)
        //                   slave, addr,        reg,     length, RnW,  En,   Swp,   Dis,   Grp, DO = None

        let slv_addr = ICM20948_I2C_SLV4_ADDR | ICM20948_I2C_SLV_ADDR_RNW   // where to place data00 (allowing R/W)
        let slv_reg = ICM20948_I2C_SLV4_REG                                 // which register to poll
        let slv_ctrl = ICM20948_I2C_SLV_CTRL_SLV_ENABLE | 1                 // length = 1 byte (with enable bit set)
        //let slv_do = ICM20948_I2C_SLV4_DO                                 // (no data output being requested here)


        this.useBank(3);
        this.writeByte(ICM20948_I2C_SLV4_ADDR, slv_addr)    // targeting slave0 address,
        this.writeByte(ICM20948_I2C_SLV4_REG, AK09916_WIA2) // ask for "Who am I" register
        this.writeByte(ICM20948_I2C_SLV4_CTRL, slv_ctrl)    // go do it!

        this.useBank(0);


        // Now activate I2C Master so I2C_slave setup can be propagated to the slave
        // self.reg_config(0,    ICM_USER_CTRL, ICM_USER_CTRL_I2C_MST_EN, True)
        //                 bank, reg,           ctrl,                     enable=True):
        // perform read-modify-write on the register
        this.registerFlags(ICM20948_USER_CTRL, 0, ICM20948_USER_CTRL_I2C_MST_EN)

        // read back the result
        let magId = this.readByte(ICM20948_EXT_SLV_SENS_DATA_00)
        if (magId == AK09916_CHIP_ID) {
            this.status |= STATUS_MAG_FOUND
        }

        this.useBank(3);
        basic.pause(10) //time.sleep(0.01);

        // Reset the magnetometer
        this.magWriteByte(AK09916_CNTL3, 0x01);
        while (this.magReadByte(AK09916_CNTL3) == 0x01) {
            control.waitMicros(100) //time.sleep(0.0001);
        }

        /* now check ID up to 10 times
        for (let i=0;i<10;i++) {
            this.write(ICM20948_I2C_MST_CTRL, 0x4D);
            basic.pause(10) //time.sleep(0.01);
            this.write(ICM20948_I2C_MST_DELAY_CTRL, 0x01);
            basic.pause(10) //time.sleep(0.01);
            if (this.mag_read(AK09916_WIA2) == AK09916_CHIP_ID) {
            }
        }
        */

        this.useBank(2);
        this.set_gyro_sample_rate(100);
        this.set_gyro_low_pass(true, 5);
        this.set_gyro_full_scale(250);

        this.set_accelerometer_sample_rate(125);
        this.set_accelerometer_low_pass(true, 5);
        this.set_accelerometer_full_scale(16);

        this.useBank(0);
        basic.pause(10) //time.sleep(0.01);
        this.writeByte(ICM20948_INT_PIN_CFG, 0x30);
        basic.pause(10) //time.sleep(0.01);

 
    }

    /**  Check main ICM Chip ID */
    checkForICM20948() {this.useBank(0);
        if (this.readByte(ICM20948_WHO_AM_I) == ICM20948_CHIP_ID) {
            this.status |= STATUS_ICM_FOUND
        }
    }


    /**  Check magnetometer sub-chip ID */
    checkForAK09916() {
        let id = -1
        if (this.magIsDirect) {
            id = this.readByte(AK09916_WIA2)
        } else {
            // we need a slave read for this register
            id = this.magReadByte(AK09916_WIA2)
        }
        if (id == AK09916_CHIP_ID) {
            this.status |= STATUS_MAG_FOUND
        }
    }
    get_status() {
        return this.status
    }

    magnetometer_ready() {
        /* Check the magnetometer status ready bit. */
        return (this.magReadByte(AK09916_ST1) & 0x01) > 0;
    }

    read_magnetometer_data(timeout = 1.0) {
        this.magWriteByte(AK09916_CNTL2, 0x01)  // Trigger single measurement
        let t_start = control.millis()
        let data:Buffer
        while (!this.magnetometer_ready()) {
            if (control.millis() - t_start > timeout) {
                /////throw RuntimeError('Timeout waiting for Magnetometer Ready');
                control.waitMicros(10) //time.sleep(0.00001);
            }
            data = this.magReadData(AK09916_HXL, 6);
        }
        // Read ST2 to confirm read finished,
        // needed for continuous modes
        // mag_this.read(AK09916_ST2)

        //////x, y, z = struct.unpack('<hhh', bytearray(data));
        let x = data.getNumber(NumberFormat.UInt16LE, 0)
        let y = data.getNumber(NumberFormat.UInt16LE, 2)
        let z = data.getNumber(NumberFormat.UInt16LE, 4)

        // Scale for magnetic flux density "uT"
        // from section 3.3 of the datasheet
        // This value is constant
        x *= 0.15;
        y *= 0.15;
        z *= 0.15;

        return [x, y, z];
    }
    read_accelerometer_gyro_data() {
        this.useBank(0);
        let data = this.readData(ICM20948_ACCEL_XOUT_H, 12);
        //ax, ay, az, gx, gy, gz = struct.unpack('>hhhhhh', bytearray(data));
        //dissect 12 bytes into 6 words
        let ax = data.getNumber(NumberFormat.UInt16LE, 0)
        let ay = data.getNumber(NumberFormat.UInt16LE, 2)
        let az = data.getNumber(NumberFormat.UInt16LE, 4)
        let gx = data.getNumber(NumberFormat.UInt16LE, 6)
        let gy = data.getNumber(NumberFormat.UInt16LE, 8)
        let gz = data.getNumber(NumberFormat.UInt16LE, 10)

        this.useBank(2);

        // Read accelerometer full scale range and
        // use it to compensate the reading to gs
        let scale = (this.readByte(ICM20948_ACCEL_CONFIG) & 0x06) >> 1;

        // scale ranges from section 3.2 of the datasheet
        let gs = [16384.0, 8192.0, 4096.0, 2048.0][scale];

        ax /= gs;
        ay /= gs;
        az /= gs;

        // Read back the degrees per second rate and
        // use it to compensate the reading to dps
        scale = (this.readByte(ICM20948_GYRO_CONFIG_1) & 0x06) >> 1;

        // scale ranges from section 3.1 of the datasheet
        let dps = [131, 65.5, 32.8, 16.4][scale];

        gx /= dps;
        gy /= dps;
        gz /= dps;

        return [ax, ay, az, gx, gy, gz];
    }

    set_accelerometer_sample_rate(rate = 125) {
        /* Set the accelerometer sample rate in Hz. */
        this.useBank(2);
        // 125Hz - 1.125 kHz / (1 + rate)
        //rate = Number((1125.0 / rate) - 1);
        rate = (1125.0 / rate) - 1;
        // TODO maybe use struct to pack and then this.write_bytes
        this.writeByte(ICM20948_ACCEL_SMPLRT_DIV_1, (rate >> 8) & 0xff);
        this.writeByte(ICM20948_ACCEL_SMPLRT_DIV_2, rate & 0xff);
    }

    set_accelerometer_full_scale(scale = 16) {
        /* Set the accelerometer fulls cale range to +- the supplied value. */
        this.useBank(2);
        let value = this.readByte(ICM20948_ACCEL_CONFIG) & 0b11111001;
        ///////value |= { 2:0b00, 4:0b01, 8:0b10, 16:0b11 }[scale] << 1;
        this.writeByte(ICM20948_ACCEL_CONFIG, value);
    }

    set_accelerometer_low_pass(enabled = true, mode = 5) {
        /* Configure the accelerometer low pass filter. */
        this.useBank(2);
        let value = this.readByte(ICM20948_ACCEL_CONFIG) & 0b10001110;
        if (enabled) {
            value |= 0b1;
            value |= (mode & 0x07) << 4;
            this.writeByte(ICM20948_ACCEL_CONFIG, value);
        }
    }

    set_gyro_sample_rate(rate = 125) {
        /* Set the gyro sample rate in Hz. */
        this.useBank(2);
        // 125Hz sample rate - 1.125 kHz / (1 + rate)
        rate = (1125.0 / rate) - 1;
        this.writeByte(ICM20948_GYRO_SMPLRT_DIV, rate);
    }

    set_gyro_full_scale(scale = 250) {
        /* Set the gyro full scale range to +- supplied value. */
        this.useBank(2);
        let value = this.readByte(ICM20948_GYRO_CONFIG_1) & 0b11111001;
        /////value |= { 250:0b00, 500:0b01, 1000:0b10, 2000:0b11 }[scale] << 1;
        this.writeByte(ICM20948_GYRO_CONFIG_1, value);
    }

    set_gyro_low_pass(enabled = true, mode = 5) {
        /* Configure the gyro low pass filter. */
        this.useBank(2);
        let value = this.readByte(ICM20948_GYRO_CONFIG_1) & 0b10001110;
        if (enabled) {
            value |= 0b1;
        }
        value |= (mode & 0x07) << 4;
        this.writeByte(ICM20948_GYRO_CONFIG_1, value);
    }

    read_temperature() {
        /* Property to read the current IMU temperature */
        // PWR_MGMT_1 defaults to leave temperature enabled
        this.useBank(0);
        let temp_raw_bytes = this.readData(ICM20948_TEMP_OUT_H, 2);
        //let temp_raw = struct.unpack('>h', bytearray(temp_raw_bytes))[0];
        let temp_raw = (temp_raw_bytes[0] << 8) + temp_raw_bytes[1]
        let temperature_deg_c = ((temp_raw - ICM20948_ROOM_TEMP_OFFSET) / ICM20948_TEMPERATURE_SENSITIVITY) + ICM20948_TEMPERATURE_DEGREES_OFFSET;
        return temperature_deg_c;
    }



    //********************************** Lowest-level I/O ********************************* */

    useMagDirect() {
    /** set up I2C access to AK09916 magnetometer in Pass-Through mode */
        this.useBank(0) 
        this.registerFlags(ICM20948_USER_CTRL,  // in the USER_CTRL register...
            ICM20948_USER_CTRL_I2C_MST_EN,  // clear the I2C_MST_EN bit
            ICM20948_INT_PIN_CFG_BYPASS_EN)  // and set the BYPASS_EN bit
        this.magIsDirect = true
    }

    useMagSlave() {
    /** prepare for I2C access to AK09916 magnetometer in Master-Slave mode */
        this.useBank(0)
        this.registerFlags(ICM20948_USER_CTRL,  // in the USER_CTRL register...
            ICM20948_INT_PIN_CFG_BYPASS_EN,  // clear the BYPASS_EN bit
            ICM20948_USER_CTRL_I2C_MST_EN)  // and set the I2C_MST_EN bit
        this.magIsDirect = false
    }
    
    initialise() {
    /* Configure I2C Master Settings: 
        -In bank 3, set the I2C master clock speed in the I2C_MST_CTRL register 
        (400 kHz is common) and the output data rate (ODR) for the auxiliary sensors 
        in the I2C_MST_ODR_CONFIG register. */
        this.writeByte(ICM20948_I2C_MST_CTRL, ICM20948_I2C_MST_CTRL_NSR | 0x07)
        this.useBank(3)
    }


    /** Nominate a register bank */
    useBank(value: number) {
        if (!(this.registerBank == value)) {
            this.writeByte(ICM20948_BANK_SEL, value << 4); // bank field is top four bits
            this.registerBank = value;
        }
    }

    magWriteByte(reg: number, value: number) {
        /**  Write a byte indirectly to a magnetometer register */
        // Set up a write access using Slave 0 register-set in bank 3
        this.useBank(3);
        this.writeByte(ICM20948_I2C_SLV0_ADDR, AK09916_I2C_ADDR) // point at AK09916
        this.writeByte(ICM20948_I2C_SLV0_REG, reg);
        this.writeByte(ICM20948_I2C_SLV0_DO, value);
        this.useBank(0);

        this.magSlaveGo();

    }

    magReadByte(reg: number) {
        /* Read a byte from the slave magnetometer. */
        // Set up a read access using Slave 0 register-set in bank 3
        this.useBank(3);
        this.writeByte(ICM20948_I2C_SLV0_ADDR, AK09916_I2C_ADDR | ICM20948_I2C_SLV_ADDR_RNW);
        this.writeByte(ICM20948_I2C_SLV0_REG, reg);
        this.writeByte(ICM20948_I2C_SLV0_DO, ICM20948_EXT_SLV_SENS_DATA_00);

        this.useBank(0);
        this.magSlaveGo();

        return this.readByte(ICM20948_EXT_SLV_SENS_DATA_00);
    }

    magReadData(reg: number, length = 1) {
        /* Read up to 24 bytes from the slave magnetometer. */
        this.useBank(3);
        this.writeByte(ICM20948_I2C_SLV0_CTRL, 0x80 | 0x08 | length);
        this.writeByte(ICM20948_I2C_SLV0_ADDR, AK09916_I2C_ADDR | ICM20948_I2C_SLV_ADDR_RNW);
        this.writeByte(ICM20948_I2C_SLV0_REG, reg);
        this.writeByte(ICM20948_I2C_SLV0_DO, ICM20948_EXT_SLV_SENS_DATA_00);
        this.useBank(0);
        this.magSlaveGo();

        return this.readData(ICM20948_EXT_SLV_SENS_DATA_00, length);
    }

    magSlaveGo() {
        /** initiate Slave transfer */
        let user = this.readByte(ICM20948_USER_CTRL);
        this.writeByte(ICM20948_USER_CTRL, user | 0x20);
        control.waitMicros(5000) //time.sleep(0.005);
        this.writeByte(ICM20948_USER_CTRL, user);
    }


    /** Modify flags in a register in the magnetometer */
    magRegisterFlags(
        register: number,
        unsetMask: number,
        setMask: number) {
        let setting = this.magReadByte(register)
        setting &= (0xff ^ unsetMask)
        setting |= setMask
        this.magWriteByte(register, setting)
        control.waitMicros(10)
    }

    /** Write value to this register of current bank. */
    writeByte(register: number, value: number) {
        let twoBytes = pins.createBuffer(2)
        twoBytes[0] = register
        twoBytes[1] = value
        pins.i2cWriteBuffer(this.icmAddress, twoBytes, false)
        control.waitMicros(100)
    }

    /**  Read byte from a register in the current bank. */
    readByte(register: number) {
        pins.i2cWriteNumber(this.icmAddress, register, NumberFormat.UInt8LE) // select register
        return pins.i2cReadNumber(this.icmAddress, NumberFormat.UInt8LE, false) // read and return
    }

    /** Read multiple byte(s) starting from a register address in the current bank. */
    readData(register: number, length = 1) {
        let buffer = pins.createBuffer(length)
        pins.i2cWriteNumber(this.icmAddress, register, NumberFormat.UInt8LE) // select register
        buffer = pins.i2cReadBuffer(this.icmAddress, length, false) //read and return
        return buffer
    }

    /** Modify flags in a register in the current bank */
    registerFlags(
        register: number,
        unsetMask: number,
        setMask: number) {
        let setting = this.readByte(register)
        setting &= (0xff ^ unsetMask)
        setting |= setMask
        this.writeByte(register, setting)
        control.waitMicros(10)
    }
//************************************************************************** */


}
