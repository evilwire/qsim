/**
 * Created by knightfu on 1/7/17.
 */


function linear(initialVal, finalVal, ratio) {
    return initialVal * (1 - ratio) + finalVal * ratio
}

export {linear}
