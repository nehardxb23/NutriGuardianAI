import { motion } from "framer-motion";


function DiseaseCard({title, icon, description, buttonText, onClick}){


return (

<motion.div

whileHover={{scale:1.05}}

className="bg-white/80 backdrop-blur-md shadow-lg rounded-3xl p-6 border border-gray-100"

>


<div className="text-5xl mb-4">
{icon}
</div>


<h2 className="text-xl font-bold text-gray-800">
{title}
</h2>


<p className="text-gray-500 mt-2">
{description}
</p>



<button

onClick={onClick}

className="mt-5 bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700"

>

{buttonText}

</button>


</motion.div>

)

}


export default DiseaseCard;