export async function handleError(error: unknown) {
    let message = 'There was an error while logging you in!';
    if (error instanceof Error) {
        message = error.message;
    }

    return message;
}
