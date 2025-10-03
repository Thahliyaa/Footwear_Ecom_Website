"""
URL configuration for Footwear_Mngmt project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.contrib.auth import views as auth_views
from footwear import views  # Assuming your app is named 'footwear'
from django.conf import settings

from django.conf.urls.static import static

urlpatterns = [
    path('', views.admin_login_view, name='home'), 
    path('admin/login/', views.admin_login_view, name='admin_login'),
    path('admin/logout/', views.logout_view, name='admin_logout'),
    path('dashboard/', views.dashboard, name='dashboard'),
    

    # Product Management
    path('products/', views.product_list, name='product_list'),
    path('products/add/', views.product_add, name='product_add'),
    path('products/delete/<int:product_id>/', views.product_delete, name='product_delete'),
    path('products/edit/<int:product_id>/', views.edit_product, name='product_edit'),

    # Orders
    path('orders/', views.order_list, name='order_list'),
    path('orders/cancel/<int:order_id>/', views.admin_cancel_order, name='admin_cancel_order'),


    # Users
    path('users/', views.user_list, name='user_list'),
    # Sales Report
    path('sales-report/', views.sales_report, name='sales_report'),
    # Change Password
    path('change-password/', views.change_password, name='change_password'),

   
   
   
    # ✅ Add your Signup API here
    path('signup/', views.Signup, name='signup'),
    path('api/login/', views.login_api_view, name='login'),
    path('api/products/', views.get_products, name='get_products'),
    path('api/products/<int:product_id>/', views.get_product_detail, name='get_product_detail'),
    path('api/cart/add/', views.add_to_cart, name='add_to_cart'),
    path('api/cart/', views.view_cart, name='view_cart'),
    path('api/cart/<int:cart_id>/remove/', views.remove_from_cart),

    path('api/order/place/', views.place_order, name='place_order'),
    path('api/order/history/', views.order_history, name='order_history'),
    path('api/order/cancel/<int:order_id>/', views.cancel_order, name='cancel_order'),
    path('api/profile/update/', views.update_profile, name='update_profile'),
    path('api/password/change/', views.change_password_api, name='change_password_api'),
    path('api/products/search/', views.search_products, name='search_products'),

]
urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
