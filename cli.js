class QuberMatrix {
    constructor(word) {
        this.word = word;
        this.len = word.length;
        this.mtx = new Array(this.len * 2);

        for (let i = 0; i < this.mtx.length; i++) {
            this.mtx[i] = new Array(this.len * 2);
        }
    }

    wordToRow(offset) {
        for (let i = 0; i < this.len; i++) {
            this.mtx[offset.y][i + offset.x] = this.word[i];
        }
    }

    wordToRowBackwards(offset) {
        for (let i = this.len; i > 0; i--) {
            this.mtx[offset.y + this.len - 1][offset.x + i - 1] = this.word[this.len - i];
        }
    }

    wordToColumn(offset) {
        for (let i = 0; i < this.len; i++) {
            this.mtx[i + offset.y][offset.x] = this.word[i];
        }
    }

    wordToColumnBackwards(offset) {
        for (let i = this.len; i > 0; i--) {
            this.mtx[i + offset.y - 1][offset.x + this.len - 1] = this.word[this.len - i];
        }
    }

    writeHalfBoard(offset = 0) {
        this.wordToRow(new Point(offset, offset));
        this.wordToColumn(new Point(offset, offset));
    }

    writeHalfBoardBackwards(offset = 0) {
        this.wordToRowBackwards(new Point(offset, offset));
        this.wordToColumnBackwards(new Point(offset, offset));
    }

    writeFullBoard(offset = 0) {
        this.writeHalfBoard(offset);
        this.writeHalfBoardBackwards(offset);
    }

    drawMultiple(letter, point, times) {
        for (let i = 0; i < times; i++) {
            this.mtx[point.y][point.x] = letter;
            point = point.increment(1, 1);
        }
    }

    materialize() {
        let xLen = this.mtx.length;
        let yLen = this.mtx[0].length;
        let sb = [];

        for (let x = 0; x < xLen; x++) {
            for (let y = 0; y < yLen; y++) {
                let value = this.mtx[x][y];
                sb.push(value ? value : " ");
            }
            sb.push('\n');
        }

        return sb.join('').trim();
    }
}

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    increment(iX, iY) {
        return new Point(this.x + iX, this.y + iY);
    }
}

class Quber {
    static to2dSimple(word) {
        var result = this.inputIsValid(word);
        if (!result.success)
            return result;

        let mtx = new QuberMatrix(word);

        mtx.writeHalfBoard();

        return mtx.materialize();
    }

    static to2dFull(word) {
        var result = this.inputIsValid(word);
        if (!result.success)
            return result;

        let mtx = new QuberMatrix(word);
        mtx.writeFullBoard();
        return mtx.materialize();
    }

    static to3d(word) {
        var result = this.inputIsValid(word);
        if (!result.success)
            return result;

        let mtx = new QuberMatrix(word);
        let rawOffset = Math.floor(mtx.len/2);
        let offset = mtx.len > 7 ? rawOffset - 1 : rawOffset;

        mtx.writeFullBoard();
        mtx.writeFullBoard(offset);

        mtx.drawMultiple('\\', new Point(1, 1), offset - 1);
        mtx.drawMultiple('\\', new Point(1, mtx.len), offset - 1);
        mtx.drawMultiple('\\', new Point(mtx.len, 1), offset - 1);
        mtx.drawMultiple('\\', new Point(mtx.len, mtx.len), offset - 1);

        return mtx.materialize();
    }

    static inputIsValid(word) {
        if (!word)
            return {
                success: false, 
                reason: 'Alguma palavra deve ser informada'
            }

        if (word.length < 3)
            return {
                success: false, 
                reason: 'A palavra deve no mínimo três caracteres'
            }

        return {success: true, reason: null}
    }
}