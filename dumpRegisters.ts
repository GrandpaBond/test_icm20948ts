
function dumpRegisters(bank: number) {
    switch (bank) {
        case 0:
    // Bank 0
    serial.writeValue("WHO_AM_I = ", i2cReadByte(ICM20948_I2C_ADDR, WHO_AM_I))
    serial.writeValue("USER_CTRL: ", i2cReadByte(ICM20948_I2C_ADDR, USER_CTRL))
    serial.writeValue("PWR_MGMT_1: ", i2cReadByte(ICM20948_I2C_ADDR, PWR_MGMT_1))
    serial.writeValue("PWR_MGMT_2: ", i2cReadByte(ICM20948_I2C_ADDR, PWR_MGMT_2))
    serial.writeValue("INT_PIN_CFG: ", i2cReadByte(ICM20948_I2C_ADDR, INT_PIN_CFG))
    serial.writeValue("ACCEL_SMPLRT_DIV_1: ", i2cReadByte(ICM20948_I2C_ADDR, ACCEL_SMPLRT_DIV_1))
    serial.writeValue("ACCEL_SMPLRT_DIV_2: ", i2cReadByte(ICM20948_I2C_ADDR, ACCEL_SMPLRT_DIV_2))
    serial.writeValue("ACCEL_INTEL_CTRL: ", i2cReadByte(ICM20948_I2C_ADDR, ACCEL_INTEL_CTRL))
    serial.writeValue("ACCEL_WOM_THR: ", i2cReadByte(ICM20948_I2C_ADDR, ACCEL_WOM_THR))
    serial.writeValue("ACCEL_CONFIG: ", i2cReadByte(ICM20948_I2C_ADDR, ACCEL_CONFIG))
    serial.writeValue("ACCEL_XOUT_H: ", i2cReadByte(ICM20948_I2C_ADDR, ACCEL_XOUT_H))
    serial.writeValue("GRYO_XOUT_H: ", i2cReadByte(ICM20948_I2C_ADDR, GRYO_XOUT_H))
    serial.writeValue("TEMP_OUT_H: ", i2cReadByte(ICM20948_I2C_ADDR, TEMP_OUT_H))
    serial.writeValue("TEMP_OUT_L: ", i2cReadByte(ICM20948_I2C_ADDR, TEMP_OUT_L))
    serial.writeValue("EXT_SLV_SENS_DATA_00: ", i2cReadByte(ICM20948_I2C_ADDR, EXT_SLV_SENS_DATA_00))
    break

    case 2:
    // Bank 2:)
    serial.writeValue("GYRO_SMPLRT_DIV: ", i2cReadByte(ICM20948_I2C_ADDR, GYRO_SMPLRT_DIV))
    serial.writeValue("GYRO_CONFIG_1: ", i2cReadByte(ICM20948_I2C_ADDR, GYRO_CONFIG_1))
    serial.writeValue("GYRO_CONFIG_1_GYRO_FS_SEL_MASK: ", i2cReadByte(ICM20948_I2C_ADDR, GYRO_CONFIG_1_GYRO_FS_SEL_MASK))
    serial.writeValue("GYRO_CONFIG_1_GYRO_DLPCFCFG_MASK: ", i2cReadByte(ICM20948_I2C_ADDR, GYRO_CONFIG_1_GYRO_DLPCFCFG_MASK))
    serial.writeValue("GYRO_CONFIG_2: ", i2cReadByte(ICM20948_I2C_ADDR, GYRO_CONFIG_2))
    serial.writeValue("ODR_ALIGN_EN: ", i2cReadByte(ICM20948_I2C_ADDR, ODR_ALIGN_EN))
    serial.writeValue("ACCEL_SMPLRT_DIV_1: ", i2cReadByte(ICM20948_I2C_ADDR, ACCEL_SMPLRT_DIV_1))
    serial.writeValue("ACCEL_SMPLRT_DIV_2: ", i2cReadByte(ICM20948_I2C_ADDR, ACCEL_SMPLRT_DIV_2))
    serial.writeValue("ACCEL_INTEL_CTRL: ", i2cReadByte(ICM20948_I2C_ADDR, ACCEL_INTEL_CTRL))
    serial.writeValue("ACCEL_WOM_THR: ", i2cReadByte(ICM20948_I2C_ADDR, ACCEL_WOM_THR))
    serial.writeValue("ACCEL_CONFIG_1: ", i2cReadByte(ICM20948_I2C_ADDR, ACCEL_CONFIG_1))
    serial.writeValue("ACCEL_CONFIG_1_ACCEL_FS_SEL_MASK: ", i2cReadByte(ICM20948_I2C_ADDR, ACCEL_CONFIG_1_ACCEL_FS_SEL_MASK))
    serial.writeValue("ACCEL_CONFIG_1_ACCEL_DLPFCFG_MASK: ", i2cReadByte(ICM20948_I2C_ADDR, ACCEL_CONFIG_1_ACCEL_DLPFCFG_MASK))
    serial.writeValue("ACCEL_CONFIG_2: ", i2cReadByte(ICM20948_I2C_ADDR, ACCEL_CONFIG_2))
    serial.writeValue("PRS_ODR_CONFIG: ", i2cReadByte(ICM20948_I2C_ADDR, PRS_ODR_CONFIG))
    serial.writeValue("PRGM_START_ADDRH: ", i2cReadByte(ICM20948_I2C_ADDR, PRGM_START_ADDRH))
    serial.writeValue("PRGM_START_ADDRL: ", i2cReadByte(ICM20948_I2C_ADDR, PRGM_START_ADDRL))
    serial.writeValue("FSYNC_CONFIG: ", i2cReadByte(ICM20948_I2C_ADDR, FSYNC_CONFIG))
    serial.writeValue("TEMP_CONFIG: ", i2cReadByte(ICM20948_I2C_ADDR, TEMP_CONFIG))
    serial.writeValue("MOD_CTRL_USR: ", i2cReadByte(ICM20948_I2C_ADDR, MOD_CTRL_USR))
    serial.writeValue("MOD_CTRL_USR_REG_LP_DMP_EN: ", i2cReadByte(ICM20948_I2C_ADDR, MOD_CTRL_USR_REG_LP_DMP_EN))
    break
    
    case 3:
    // Bank 3:
    serial.writeValue("I2C_MST_ODR_CONFIG: ", i2cReadByte(ICM20948_I2C_ADDR, I2C_MST_ODR_CONFIG))
    serial.writeValue("I2C_MST_CTRL: ", i2cReadByte(ICM20948_I2C_ADDR, I2C_MST_CTRL))
    serial.writeValue("I2C_MST_DELAY_CTRL: ", i2cReadByte(ICM20948_I2C_ADDR, I2C_MST_DELAY_CTRL))
    serial.writeValue("I2C_SLV0_ADDR: ", i2cReadByte(ICM20948_I2C_ADDR, I2C_SLV0_ADDR))
    serial.writeValue("I2C_SLV0_REG: ", i2cReadByte(ICM20948_I2C_ADDR, I2C_SLV0_REG))
    serial.writeValue("I2C_SLV0_CTRL: ", i2cReadByte(ICM20948_I2C_ADDR, I2C_SLV0_CTRL))
    serial.writeValue("I2C_SLV0_DO: ", i2cReadByte(ICM20948_I2C_ADDR, I2C_SLV0_DO))
    serial.writeValue("I2C_SLV1_ADDR: ", i2cReadByte(ICM20948_I2C_ADDR, I2C_SLV1_ADDR))
    serial.writeValue("I2C_SLV1_REG: ", i2cReadByte(ICM20948_I2C_ADDR, I2C_SLV1_REG))
    serial.writeValue("I2C_SLV1_CTRL: ", i2cReadByte(ICM20948_I2C_ADDR, I2C_SLV1_CTRL))
    serial.writeValue("I2C_SLV1_DO: ", i2cReadByte(ICM20948_I2C_ADDR, I2C_SLV1_DO))
    serial.writeValue("I2C_SLV2_ADDR: ", i2cReadByte(ICM20948_I2C_ADDR, I2C_SLV2_ADDR))
    serial.writeValue("I2C_SLV2_REG: ", i2cReadByte(ICM20948_I2C_ADDR, I2C_SLV2_REG))
    serial.writeValue("I2C_SLV2_CTRL: ", i2cReadByte(ICM20948_I2C_ADDR, I2C_SLV2_CTRL))
    serial.writeValue("I2C_SLV2_DO: ", i2cReadByte(ICM20948_I2C_ADDR, I2C_SLV2_DO))
    serial.writeValue("I2C_SLV3_ADDR: ", i2cReadByte(ICM20948_I2C_ADDR, I2C_SLV3_ADDR))
    serial.writeValue("I2C_SLV3_REG: ", i2cReadByte(ICM20948_I2C_ADDR, I2C_SLV3_REG))
    serial.writeValue("I2C_SLV3_CTRL: ", i2cReadByte(ICM20948_I2C_ADDR, I2C_SLV3_CTRL))
    serial.writeValue("I2C_SLV3_DO: ", i2cReadByte(ICM20948_I2C_ADDR, I2C_SLV3_DO))
    serial.writeValue("I2C_SLV4_ADDR: ", i2cReadByte(ICM20948_I2C_ADDR, I2C_SLV4_ADDR))
    serial.writeValue("I2C_SLV4_REG: ", i2cReadByte(ICM20948_I2C_ADDR, I2C_SLV4_REG))
    serial.writeValue("I2C_SLV4_CTRL: ", i2cReadByte(ICM20948_I2C_ADDR, I2C_SLV4_CTRL))
    serial.writeValue("I2C_SLV4_DO: ", i2cReadByte(ICM20948_I2C_ADDR, I2C_SLV4_DO))
    serial.writeValue("I2C_SLV4_DI: ", i2cReadByte(ICM20948_I2C_ADDR, I2C_SLV4_DI))

    // Magnetometer:
    serial.writeValue("AK09916_WIA2: ", i2cReadByte(AK09916_I2C_ADDR, AK09916_WIA2))
    serial.writeValue("AK09916_ST1: ", i2cReadByte(AK09916_I2C_ADDR, AK09916_ST1))
    serial.writeValue("AK09916_HXL: ", i2cReadByte(AK09916_I2C_ADDR, AK09916_HXL))
    serial.writeValue("AK09916_ST2: ", i2cReadByte(AK09916_I2C_ADDR, AK09916_ST2))
    serial.writeValue("AK09916_CNTL2: ", i2cReadByte(AK09916_I2C_ADDR, AK09916_CNTL2))
    serial.writeValue("AK09916_CNTL3: ", i2cReadByte(AK09916_I2C_ADDR, AK09916_CNTL3))
    break
    }
}