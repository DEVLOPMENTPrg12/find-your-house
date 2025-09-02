// export default function Product(){
//     const data=[
//         {
//             name:'Florence',
//             price:120,
//             image:'/DSC_0058-1-scaled.jpg'
//         },
//         {
//             name:'Flore',
//             price:1209,
//             image:'/public/th (17).jpeg'
//         },
//         {
//             name:'Panii',
//             price:12090,
//             image:'/public/th (17).jpeg'
//         },

import { useDispatch } from "react-redux"
import { addTocart } from "./slice"


//     ]
//     function dispalymap(){
//         return data.map((i,prd)=>{
//             return(
//                 <div className="card1" key={i} >
//                 <img  src={prd.image} />
//                 <div>
//                     <h3> {prd.name} </h3>
//                     <p>$ {prd.price} </p>
//                     <button className="btn">Add to cart</button>
//                 </div>

//             </div>
//             )
//         })
//     }
//     return(
//        <div>
//         <h1>New Product</h1>
//            {dispalymap()}
//        </div>
//     )
// }
 
export default function Products(){
    const dispatch=useDispatch()
    const data=[
        {
            name:'Florence',
            price:120,
            image:"/DSC_0058-1-scaled.jpg"
        },
        {
            name:'Ollie',
            price:79.48,
            image:"/th (17).jpeg"
        },
        {
            name:'Percy',
            price:82.58,
            image:"/DSC_0058-1-scaled.jpg"
        },
    ]
    function displaymap(){
       return data.map((prd,i)=>{
            return(
                <div className="card1" key={i} >
                <img src={prd.image} />
                <div>
                    <h3> {prd.name} </h3>
                    <p>$ {prd.price} </p>
                    <button className="btn" onClick={()=>dispatch(addTocart(prd))}>Add to cart</button>
                </div>

            </div>
            )
        })
    }
    return(
        <div>
            <h1>New In</h1>
            <div className="container">
                
                {displaymap()}
                
            </div>
        </div>
    )
}