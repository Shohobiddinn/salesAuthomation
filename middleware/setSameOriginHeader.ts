export default function (req: any, res: any, next: any) {
    res?.setHeader("Access-Control-Allow-Origin", "*");
    res?.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res?.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
}