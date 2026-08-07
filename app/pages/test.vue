<template>
    <div class="pb-[74px]">
        <div class="w-[1112px] m-auto">

            <div class="flex items-center gap-2 text-sm text-slate-500">
                <img src="/icons/home.svg" alt="home" >
                <img src="/icons/arrow.svg" alt="arrow" class="rotate-90">
                <p>لیست محصولات</p>
                <img src="/icons/arrow.svg" alt="arrow" class="rotate-90">
                <p>نام محصول</p>
            </div>

        <div class="w-full h-[912px] mt-6">
          <!-- product image -->
           <div class="bg-white rounded-[24px] w-full h-[414px]">
             <div class="flex flex-col items-start gap-6 p-6">
                <p class="text-lg font-bold text-slate-700 ">نام محصول</p>
                <img src="/imgs/img-sample.png" alt="product image" class="w-full h-full object-cover"/>
             </div>
           </div>

           <!-- description -->
            <div class="bg-white mt-6 rounded-[24px] w-full h-[500px]">
                <div class="flex flex-col items-start gap-6 p-6">
                    <p class="text-lg font-bold text-slate-700 ">توضیحات محصول</p>
                    <div class="flex flex-col gap-3">
                        <!-- price -->
                        <div class="flex gap-3">
                            <div class="flex bg-[#F5F7FA] w-[172px] h-[48px] rounded-r-[16px] rounded-l-[4px] items-center pr-4">
                                <p class="text-sm font-bold text-[#57728E]">قیمت</p>
                            </div>
                            <div class="flex bg-[#F5F7FA] w-[880px] h-[48px] rounded-l-[16px] rounded-r-[4px] items-center pl-4">
                                <p class="text-sm font-bold text-[#30445B] pr-4">۱۰۰٬۰۰۰ تومان</p>
                            </div>
                        </div>

                        <!-- summary -->
                        <div class="flex gap-3">
                            <div class="flex bg-[#F5F7FA] w-[172px] min-h-[48px] rounded-r-[16px] rounded-l-[4px] items-center pr-4">
                                <p class="text-sm font-bold text-[#57728E]">توضیحات</p>
                            </div>
                            <div class="flex  bg-[#F5F7FA] w-[880px] min-h-[48px] rounded-l-[16px] rounded-r-[4px] items-center pl-4">
                                <ul class="flex flex-col list-disc gap-3 marker:text-[#black] w-[460px] pr-8 py-[18px] text-sm font-bold text-[#30445B]">
                                    <li>سنسورهای تشخیص موانع: دارای سنسورهای اولتراسونیک برای تشخیص موانع در مسیر درب</li>
                                    <li>توقف خودکار: در صورت تشخیص موانع، درب به صورت خودکار توقف و باز نمی‌شود</li>
                                    <li>کلید اضطراری: دارای کلید اضطراری برای قطع فوری تغذیه و توقف درب</li>
                                </ul>
                            </div>
                        </div>

                        <!-- category -->
                        <div class="flex gap-3">
                            <div class="flex bg-[#F5F7FA] w-[172px] h-[48px] rounded-r-[16px] rounded-l-[4px] items-center pr-4">
                                <p class="text-sm font-bold text-[#57728E]">دسته بندی</p>
                            </div>
                            <div class="flex bg-[#F5F7FA] w-[880px] h-[48px] rounded-l-[16px] rounded-r-[4px] items-center pl-4">
                                <p class="text-sm font-bold text-[#30445B] pr-4">کشویی</p>
                            </div>
                        </div>

                        <!-- count -->
                        <div class="flex gap-3">
                            <div class="flex bg-[#F5F7FA] w-[172px] h-[48px] rounded-r-[16px] rounded-l-[4px] items-center pr-4">
                                <p class="text-sm font-bold text-[#57728E]">تعداد</p>
                            </div>
                            <div class="flex bg-[#F5F7FA] w-[880px] h-[48px] rounded-l-[16px] rounded-r-[4px] items-center pl-4">
                                <p class="text-sm font-bold text-[#30445B] pr-4">۱۰</p>
                            </div>
                        </div>

                        <!-- rate -->
                        <div class="flex gap-3">
                            <div class="flex bg-[#F5F7FA] w-[172px] h-[48px] rounded-r-[16px] rounded-l-[4px] items-center pr-4">
                                <p class="text-sm font-bold text-[#57728E]">رتبه</p>
                            </div>
                            <div class="flex bg-[#F5F7FA] w-[880px] h-[48px] rounded-l-[16px] rounded-r-[4px] items-center pl-4">
                                <p class="text-sm font-bold text-[#30445B] pr-4">۴</p>
                            </div>
                        </div>
                        
                    </div>
                </div>


            </div>
        </div>
        </div>
    </div>
  </template>