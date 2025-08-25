const asyncHandler = (contollerFunc) => {

    return async (req,res,next) => {
        try {
            await contollerFunc(req, res, next)
        } catch (error) {
            console.log(error)
        }
    }

}

export default asyncHandler