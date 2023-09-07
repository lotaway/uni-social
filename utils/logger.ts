import initConfig from "../config/init_config";

class Logger {

    isOn: boolean

    constructor(isOn = initConfig.DEBUG) {
        this.isOn = isOn;
    }

    output(message: any, force?: boolean) {
        return (force || this.isOn) && console.log(message);
    }

    private static paramChecker(target: any, propName: string, descriptor: PropertyDescriptor) {
        const methods = descriptor.value;

        descriptor.value = function (desc: string, ...params: any[]) {
            return methods.call(this, desc || "Logger", ...params);
        };
    }

    @Logger.paramChecker
    static simple(desc?: string, force?: boolean) {
        const logger = new Logger(force);

        // logger.output("启用 logger.simple ——" + desc);

        return (target: any, propName: string, descriptor: PropertyDescriptor) => {
            const methods = descriptor.value;

            // logger.output("set ——" + desc);
            descriptor.value = function (...params: any[]) {
                logger.output("调用 ——" + desc);

                return methods.call(this, ...params);
            }
        };
    }

    @Logger.paramChecker
    static detail(desc?: string, force?: boolean) {
        const logger = new Logger(force);

        // logger.output("启用 logger.detail ——" + desc);

        return function (target: any, propName: string, descriptor: PropertyDescriptor) {
            const methods = descriptor.value;

            // logger.output("定义 " + target.name + "." + propName + " ——" + desc);
            descriptor.value = function (...params: any[]) {
                logger.output("调用 " + (target.name || target.constructor.name) + "." + propName + " with params:" + JSON.stringify(params) + " ——" + desc);

                return methods.call(this, ...params);
            }
        };
    }

}

export default Logger;