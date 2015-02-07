## Blogger

To add Gratipay to Blogger, use gadget from gratipay.xml. Go to your
you blog overview, then:

    Layout -> Add a Gadget -> Add your own

Enter URL ('https://' prefix didn't work for me):

    grtp.co/v1/blogger/gratipay.xml

Set your "Name on Gratipay" (widget type if you want) and view how
it looks on your blog page. Blogger preview didn't work correctly
for me, so don't pay attention to it.

# Google Code

To add gadget to Google Code pages, use the following snippet:

    <wiki:gadget url="https://grtp.co/v1/blogger/gratipay.xml" height="72" border="0"
    up_name="techtonik" />

`up_name` is parameter that you need to set with your name.
You can also specify `up_type="giving"` to get different widget
type.
