import Identity from "./Identity";

export default class Entity<T> {
    private entityId: Identity;
    protected attributes: T;

    protected constructor(attributes: T, id?: Identity) {
        this.attributes = attributes;
        this.entityId = id ?? new Identity();
    }

    get Id(): Identity {
        return this.entityId;
    }
}