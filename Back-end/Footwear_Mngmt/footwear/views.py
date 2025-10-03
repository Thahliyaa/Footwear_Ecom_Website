from django.http import JsonResponse
from django.shortcuts import get_object_or_404, render, redirect
from django.contrib.auth import login,logout, authenticate, get_user_model
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .forms import ProductForm
from django.contrib import messages
from django.core.paginator import Paginator
from footwear.models import Cart, Product, User, Order
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from rest_framework.status import HTTP_200_OK



def admin_login_view(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        user = authenticate(request, email=email, password=password)  # ✅ Note: email= not username=

        if user is not None:
            login(request, user)
            return redirect('dashboard')
        else:
            messages.error(request, 'Invalid email or password')

    return render(request, 'login.html')



def logout_view(request):
    logout(request)
    messages.success(request, 'You have been logged out successfully.')
    return redirect('admin_login')

def dashboard(request):
    return render(request, 'dashboard.html')


def product_list(request):
    search_query = request.GET.get('search', '')
    products = Product.objects.all()
    if search_query:
        products = products.filter(
            name__icontains=search_query
        )
    return render(request, 'product_list.html', {'products': products})

def product_delete(request, product_id):
    product = get_object_or_404(Product, product_id=product_id)
    product.delete()
    return redirect('product_list')

def product_add(request):
    if request.method == 'POST':
        form = ProductForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('product_list')
    else:
        form = ProductForm()
    return render(request, 'product_form.html', {'form': form})

def edit_product(request, product_id):
    product = get_object_or_404(Product, product_id=product_id)
    if request.method == 'POST':
        form = ProductForm(request.POST, request.FILES, instance=product)
        if form.is_valid():
            form.save()
            return redirect('product_list')
    else:
        form = ProductForm(instance=product)
    return render(request, 'product_form.html', {'form': form})

def order_list(request):
    orders = Order.objects.select_related('product', 'user').order_by('-order_date')
    return render(request, 'order_list.html', {'orders': orders})

def admin_cancel_order(request, order_id):
    order = get_object_or_404(Order, order_id=order_id)

    if order.payment_status != 'Pending':
        messages.error(request, f'Order #{order_id} cannot be cancelled.')
    else:
        order.payment_status = 'Cancelled'
        order.save()
        messages.success(request, f'Order #{order_id} cancelled successfully.')

    return redirect('order_list')

def user_list(request):
    query = request.GET.get('q', '')
    users = User.objects.all()

    if query:
        users = users.filter(Q(name__icontains=query) | Q(email__icontains=query))

    paginator = Paginator(users, 5)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    return render(request, 'user_list.html', {'users': page_obj})



def sales_report(request):
    orders = Order.objects.select_related('product')

    # Filters
    date = request.GET.get('date')
    brand = request.GET.get('brand')
    category = request.GET.get('category')

    if date:
        orders = orders.filter(order_date__date=date)
    if brand:
        orders = orders.filter(product__brand__icontains=brand)
    if category:
        orders = orders.filter(product__category__icontains=category)

    # Total sales
    total_sales = sum(order.product.price for order in orders if order.payment_status == "Completed")
    order_count = orders.count()

    context = {
        'orders': orders,
        'total_sales': total_sales,
        'order_count': order_count,
    }
    return render(request, 'sales_report.html', context)


def change_password(request):
    if request.method == 'POST':
        old_password = request.POST.get('old_password')
        new_password = request.POST.get('new_password1')
        confirm_password = request.POST.get('new_password2')

        if not old_password or not new_password or not confirm_password:
            messages.error(request, 'All fields are required.')
            return redirect('change_password')

        user = request.user
        if not user.check_password(old_password):
            messages.error(request, 'Old password is incorrect.')
        elif new_password != confirm_password:
            messages.error(request, 'New passwords do not match.')
        else:
            user.set_password(new_password)
            user.save()
            messages.success(request, 'Password changed successfully.')
            return redirect('admin_login')

    return render(request, 'change_password.html')







#Api ----------

@api_view(['POST'])
@permission_classes((AllowAny,))
def Signup(request):
        email  = request.data.get("email")
        password = request.data.get("password")
        name = request.data.get("name")
        address = request.data.get("address")
        phone_no = request.data.get("phone_no")

        if not name or not email or not password:
            return Response({'message':'All fields are required'})
        if User.objects.filter(email=email).exists():
            return  JsonResponse({'message':'Email already exist'})
        user = User.objects.create_user(email=email,password=password)
        user.name = name
        user.address = address
        user.phone_no = phone_no
        user.save()
        return JsonResponse({'message':'user created successsfully'} ,status = 200)





@api_view(['POST'])
@permission_classes((AllowAny,))
def login_api_view(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({'message': 'Email and password are required'}, status=400)

    user = authenticate(request, username=email, password=password)

    if user is not None:
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'message': 'Login successful',
            'token': token.key,
            'user_id': user.id
        }, status=200)
    else:
        return Response({'message': 'Invalid email or password'}, status=401)
    

@api_view(['GET'])
@permission_classes([AllowAny])
def get_products(request):
    products = Product.objects.all().values(
        'product_id', 'name', 'price', 'category', 'brand', 'image', 'description'
    )
    return JsonResponse(list(products), safe=False)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_product_detail(request, product_id):
    try:
        product = Product.objects.filter(product_id=product_id).values(
            'product_id', 'name', 'price', 'category', 'brand', 'image', 'description'
        ).first()
        if not product:
            raise Product.DoesNotExist
        return JsonResponse(product)
    except Product.DoesNotExist:
        return JsonResponse({'message': 'Product not found'}, status=404)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    user = request.user
    product_id = request.data.get('product_id')

    if not product_id:
        return JsonResponse({'message': 'Product ID is required'}, status=400)

    try:
        product = Product.objects.get(product_id=product_id)
        Cart.objects.create(user=user, product=product)
        return JsonResponse({'message': 'Product added to cart successfully'})
    except Product.DoesNotExist:
        return JsonResponse({'message': 'Product not found'}, status=404)
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_cart(request):
    user = request.user
    cart_items = Cart.objects.filter(user=user).select_related('product')

    cart_data = []
    for item in cart_items:
        cart_data.append({
            'cart_id': item.id,
            'product_id': item.product.product_id,
            'product_name': item.product.name,
            'price': float(item.product.price),
            'brand': item.product.brand,
            'category': item.product.category,
            'image': item.product.image.url if item.product.image else None,
            'added_date': item.added_date.strftime('%Y-%m-%d %H:%M:%S')
        })

    return JsonResponse(cart_data, safe=False)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_from_cart(request, cart_id):
    user = request.user
    try:
        cart_item = Cart.objects.get(id=cart_id, user=user)
        cart_item.delete()
        return JsonResponse({'message': 'Item removed from cart successfully'}, status=200)
    except Cart.DoesNotExist:
        return JsonResponse({'message': 'Cart item not found'}, status=404)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def place_order(request):
    user = request.user
    name = request.data.get('name')
    phone_no = request.data.get('phone_no')
    address = request.data.get('address')

    # Update user info
    user.name = name
    user.phone_no = phone_no
    user.address = address
    user.save()

    cart_items = Cart.objects.filter(user=user).select_related('product')
    if not cart_items.exists():
        return JsonResponse({'message': 'Cart is empty'}, status=400)

    orders = []
    for item in cart_items:
        order = Order.objects.create(
            user=user,
            product=item.product,
            payment_status='Pending'
        )
        orders.append({
            'order_id': order.order_id,
            'product_name': order.product.name,
            'price': float(order.product.price),
            'status': order.payment_status
        })

    cart_items.delete()

    return JsonResponse({
        'message': 'Order placed successfully',
        'shipping_to': address,
        'orders': orders
    }, status=201)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def order_history(request):
    user = request.user
    orders = Order.objects.filter(user=user).select_related('product').order_by('-order_date')

    order_list = []
    for order in orders:
        order_list.append({
            'order_id': order.order_id,
            'product_name': order.product.name,
            'brand': order.product.brand,
            'price': float(order.product.price),
            'image': order.product.image.url if order.product.image else '',
            'payment_status': order.payment_status,
            'order_date': order.order_date.strftime('%Y-%m-%d %H:%M')
        })

    return JsonResponse({'orders': order_list}, status=200)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def cancel_order(request, order_id):
    user = request.user
    try:
        order = Order.objects.get(order_id=order_id, user=user)
    except Order.DoesNotExist:
        return JsonResponse({'message': 'Order not found'}, status=404)

    if order.payment_status != 'Pending':
        return JsonResponse({'message': 'Only pending orders can be canceled'}, status=400)

    order.payment_status = 'Cancelled'
    order.save()

    return JsonResponse({'message': f'Order #{order_id} has been canceled'}, status=200)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    user = request.user
    user.name = request.data.get('name', user.name)
    user.email = request.data.get('email', user.email)
    user.phone_no = request.data.get('phone_no', user.phone_no)
    user.address = request.data.get('address', user.address)
    user.save()
    return JsonResponse({'message': 'Profile updated successfully'})
    

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_password_api(request):
    user = request.user
    current_password = request.data.get('current_password')
    new_password = request.data.get('new_password')
    confirm_password = request.data.get('confirm_password')

    if not user.check_password(current_password):
        return JsonResponse({'error': 'Current password is incorrect'}, status=400)
    if new_password != confirm_password:
        return JsonResponse({'error': 'Passwords do not match'}, status=400)

    user.set_password(new_password)
    user.save()
    return JsonResponse({'message': 'Password updated successfully'})



@api_view(['GET'])
@permission_classes([AllowAny])
def search_products(request):
    query = request.GET.get('q', '')

    if not query:
        return JsonResponse({"error": "Search query is required"}, status=400)

    products = Product.objects.filter(
        Q(name__icontains=query) |
        Q(description__icontains=query) |
        Q(brand__icontains=query) |
        Q(category__icontains=query)
    )

    results = []
    for product in products:
        results.append({
            'product_id': product.product_id,
            'name': product.name,
            'price': product.price,
            'brand': product.brand,
            'category': product.category,
            'image': product.image.url if product.image else '',
            'description': product.description,
        })

    return JsonResponse(results, safe=False)
