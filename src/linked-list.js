const Node = require('./node');

class LinkedList {

    constructor() {

        this.length = 0;
        this.index = 0;

        this._head = null;
        this._tail = null;
    }

    append(data) {

        const node = new Node(data);

        if (!this.length) {

            this._head = node;
            this._tail = node;

        } else {

            node.prev = this._tail;

            this._tail.next = node;
            this._tail = node;

        }

        this.length++;

        return this;

    }

    head() {

        return !this._head ? null : this._head.data;

    }

    tail() {

        return !this._tail ? null : this._tail.data;

    }

    at(index, insertAt = false) {

        let currentNode = this._head,
            i = 0;

        while (currentNode) {

            if (i++ == index) {

                if (insertAt) {

                    return currentNode ? currentNode : null;
                }

                return currentNode.data;
            }

            currentNode = currentNode.next;

        }

        return null;
    }

    insertAt(index, data) {

        let nodeRight = this.at(index, true);

        if (nodeRight) {

            const newNode = new Node(data, nodeRight.prev, nodeRight);

            if (nodeRight.prev) {

                nodeRight.prev.next = newNode;
                nodeRight.prev = newNode;
            }

            this.length++;

        }

        this.append(data);

        return this;

    }

    isEmpty() {

        return !this.length;
    }

    clear() {

        while (this._tail && this._tail.prev) {

            this._tail = this._tail.prev;
            this._tail.next = null;
        }

        if (this._head) {

            this._head.data = null;
        }

        if (this._tail) {

            this._tail.data = null;
        }

        this.length = 0;

        return this;
    }

    deleteAt(index) {

        let node = this.at(index, true);

        if (!node) {

            return null;
        }

        if (node == this._head) {

            this._head = node.next;
        }

        if (node == this._tail) {

            this._tail = node.prev;
        }

        if (node.next) {

            node.next.prev = node.prev;
        }

        if (node.prev) {

            node.prev.next = node.next;
        }

        this.length--;

        return this;
    }

    reverse() {

        if (this.length > 1) {

            this._head = this._tail;

            let currentNode = this._head,
                tmp = null;

            while (currentNode.prev) {

                tmp = currentNode.next;
                currentNode.next = currentNode.prev;
                currentNode.prev = tmp;
                currentNode = currentNode.next
            }

            this._tail = currentNode;
        }

        return this;
    }

    indexOf(data) {

        let node = this._head,
            i = 0;

        while (node) {

            if (node.data == data) {

                return i;
            }

            node = node.next;
            i++;
        }

        return -1;

    }
}

let list = new LinkedList;

module.exports = LinkedList;