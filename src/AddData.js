import React from 'react'

export const AddData = () => {
  return (
    <div className='add-panel'>
        <div className='flex justify-center'>
        <span className='text-teal-600 text-xl m-2 '>Report a disaster data</span>
        </div>
    <div class="flex justify-center p-1 m-2"> 
    <div class="mb-3 xl:w-96 ">
    <form>
    <label for="exampleFormControlInput1" className="form-label inline-block mb-2 text-gray-700" >Address</label>
    <input type="text"
      class="
       mb-5
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
      id="exampleFormControlInput1"
      placeholder="Enter the address"
    />

<label for="exampleFormControlInput2" className="form-label inline-block mb-2 text-gray-700" >Latitude</label>
    <input type="text"
      className="
      mb-5
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
      id="exampleFormControlInput2"
      placeholder="Enter Laltitude"
    />

<label for="exampleFormControlInput1" className="form-label inline-block mb-2 text-gray-700" >Longitude</label>
    <input type="text"
      className="
       mb-5
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
      id="exampleFormControlInput1"
      placeholder="Enter the longitude"
    />
    <div className='flex justify-center'>
    <button class="bg-teal-500 hover:bg-teal-900 text-white font-bold py-2 px-4 rounded "> Button</button>
    </div>
    </form>

  </div>
</div>
</div>
  )
}
