class Like {
    constructor (button, media, count) {
    this.button = button;
    this.media = media;
    this.count = count;
    }

    addLike() {
        this.count += 1;
    }
}