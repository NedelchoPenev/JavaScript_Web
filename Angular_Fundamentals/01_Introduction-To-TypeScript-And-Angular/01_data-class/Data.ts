class RequestData {
    response: string;
    fulfilled: boolean;

    constructor(public method: string,
        public url: string,
        public version: string,
        public message: string) {
            
        this.response = undefined
        this.fulfilled = false
    }
}