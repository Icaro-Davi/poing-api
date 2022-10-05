
// type CallbackFunc<A> = (...args: any[]) => Promise<A>;
type CallbackFunc<A> = A;

export default {
    key: 'RegistrationRequest',
    async handle<T = any>(callback: CallbackFunc<T>) {
        // return await callback();
    }
}