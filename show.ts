enum ShowMode {
    NONE = 0,
    BASIC = 1,
    LOGGED = 2,
    SERIAL = 3
}
namespace Show{
    /** Set output mode */
    let showOutput = ShowMode.BASIC
    export function use(mode:ShowMode) {
        let showOutput = mode
    }

    /** Display message in current output mode */
    export function see(message:string) {
        switch(showOutput){
            case ShowMode.NONE:
                break
            case ShowMode.BASIC:
                basic.showString(message)
                pause(1000)
                basic.clearScreen()
                break
            case ShowMode.LOGGED:
                datalogger.log(datalogger.createCV('message',message))
                break
            case ShowMode.SERIAL:
                serial.writeLine(message)
                pause(100)
                break
        }
    }
}
