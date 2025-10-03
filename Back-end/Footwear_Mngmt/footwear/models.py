# from django.contrib.auth import authenticate
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager 
from django.db import models
# from rest_framework.authtoken.models import Token
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import AllowAny
# from rest_framework.response import Response 
class UserManager(BaseUserManager): 
     def create_user(self, email, password=None): 
          if not email: 
              raise ValueError("Users must have an email address") 
          email = self.normalize_email(email) 
          user = self.model(email=email) 
          user.set_password(password) 
          user.save(using=self._db) 
          return user 
 
     def create_superuser(self, email, password): 
        user = self.create_user(email, password) 
        user.is_admin = True 
        User.is_superuser = True 
        user.save(using=self._db) 
        return user 
 
class User(AbstractBaseUser): 
    email = models.EmailField(unique=True) 
    name = models.CharField(max_length =255)
    phone_no = models.IntegerField(default='1234567890')
    address = models.CharField(max_length =255,null=True)
    is_active = models.BooleanField(default=True) 
    is_admin = models.BooleanField(default=False) 
    date_joined = models.DateTimeField(auto_now_add=True)
    objects = UserManager() 
 
    USERNAME_FIELD = 'email'


class Product(models.Model):
    product_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=50)  
    brand = models.CharField(max_length=100)
    image = models.FileField(upload_to='images/') 
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class Order(models.Model):
    PAYMENT_STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Paid', 'Paid'),
        ('Failed', 'Failed'),
    ]

    order_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    payment_status = models.CharField(max_length=10, choices=PAYMENT_STATUS_CHOICES, default='Pending')
    order_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order #{self.order_id} - {self.user.name}"  # 🔁 Fixed username -> name


class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey('Product', on_delete=models.CASCADE)
    added_date = models.DateTimeField(auto_now_add=True)
   

    def __str__(self):
        return f"{self.user.name}'s cart - {self.product.name}"







