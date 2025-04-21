import { v4 as uuidv4 } from 'uuid';

export default class Identity {
    private value: string;

    constructor(value?: string) {
        this.value = value ?? uuidv4();
    }

    get valueId(): string {
        return this.value;
    }
} 