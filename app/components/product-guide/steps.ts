export interface ProductGuideStep {
  id: string
  target: string
  title: string
  body: string
}

export const productGuideSteps: ProductGuideStep[] = [
  {
    id: 'static-details',
    target: 'product-details',
    title: 'نکته',
    body: 'فقط عنوان و تصویر از ای پی ای دریافت میشوند، و توضیحات محصول برای حفظ نظم و نمایش بهتر بصورت استاتیک نوشته شده اند. چون در ای پی ای بصورت انگلیسی و از چپ به راست هستند با یو ای همخوانی ندارد',
  },
]
