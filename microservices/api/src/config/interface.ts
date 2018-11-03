interface IConfig {
    get(k: string): string
    has(k: string): boolean
}

export default IConfig;
