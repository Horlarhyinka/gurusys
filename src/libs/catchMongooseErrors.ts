

//this middleware is a layer 2 validation by mongoose, i.e it catches any validation error that the app logic misses and handles error
export default function(err:any){
    if(err.code == 11000){
        return `${Object.keys(err.keyValue)[0]} is taken`
    }
    if(err.message?.toLowerCase().includes("validation")){
        return Object.keys(err.errors).map(field=>err.errors[field].properties?.message)
    }
}