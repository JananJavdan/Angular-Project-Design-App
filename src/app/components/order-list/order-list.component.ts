import { Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';

import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [   
    FormsModule,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatPaginatorModule
  ],
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent {
  orders: Order[] = [
    {
      id: 1,
      productName: 'Tiaford Women\'s Linen Dress',
      description: 'Short sleeve crewneck',
      price: 25.99,
      quantity: 1,
      orderDate: new Date('2023-04-12'),
      status: 'Shipped',
      productImages: [
        'tshirt1.webp' // Slechts één productafbeelding per order
      ],
      userPhotoUrl: 'tshirt1.webp', // Unieke foto voor elke gebruiker
      customer_id: 1,
      design_id: 1,
      order_manager_id: 1,
      total_price: 25.99
    },
    {
      id: 2,
      productName: 'Bengbobar Women\'s Cotton Linen Dress',
      description: 'Loose fit with a long design',
      price: 26.99,
      quantity: 1,
      orderDate: new Date('2023-04-14'),
      status: 'Processing',
      productImages: [
        'tshirt2.webp'
      ],
      userPhotoUrl: 'tshirt2.webp',
      customer_id: 2,
      design_id: 2,
      order_manager_id: 2,
      total_price: 26.99
    },
    {
      id: 3,
      productName: 'Zara Women\'s Maxi Dress',
      description: 'Elegant evening dress',
      price: 49.99,
      quantity: 1,
      orderDate: new Date('2023-05-01'),
      status: 'Delivered',
      productImages: [
        'tshirt3.webp'
      ],
      userPhotoUrl: 'tshirt3.webp',
      customer_id: 3,
      design_id: 3,
      order_manager_id: 3,
      total_price: 49.99
    },
    {
      id: 4,
      productName: 'H&M Women\'s Casual Dress',
      description: 'Perfect for daily wear',
      price: 19.99,
      quantity: 1,
      orderDate: new Date('2023-05-10'),
      status: 'Processing',
      productImages: [
        'tshirt4.webp'
      ],
      userPhotoUrl: 'tshirt4.webp',
      customer_id: 4,
      design_id: 4,
      order_manager_id: 4,
      total_price: 19.99
    },
    {
      id: 5,
      productName: 'Uniqlo Women\'s Cotton Dress',
      description: 'Soft and comfortable',
      price: 29.99,
      quantity: 1,
      orderDate: new Date('2023-05-15'),
      status: 'Shipped',
      productImages: [
        'tshirt5.jpeg'
      ],
      userPhotoUrl: 'tshirt5.jpeg',
      customer_id: 5,
      design_id: 5,
      order_manager_id: 5,
      total_price: 29.99
    },
    {
      id: 6,
      productName: 'Mango Women\'s Floral Dress',
      description: 'Beautiful floral summer dress',
      price: 39.99,
      quantity: 1,
      orderDate: new Date('2023-06-01'),
      status: 'Delivered',
      productImages: [
        'tshirt6.webp'
      ],
      userPhotoUrl: 'tshirt6.webp',
      customer_id: 6,
      design_id: 6,
      order_manager_id: 6,
      total_price: 39.99
    },
    {
      id: 7,
      productName: 'Forever 21 Women\'s Sundress',
      description: 'Light and breezy for summer',
      price: 22.99,
      quantity: 1,
      orderDate: new Date('2023-06-05'),
      status: 'Processing',
      productImages: [
        'tshirt7.jpg'
      ],
      userPhotoUrl: 'tshirt7.jpg',
      customer_id: 7,
      design_id: 7,
      order_manager_id: 7,
      total_price: 22.99
    },
    {
      id: 8,
      productName: 'ASOS Women\'s Midi Dress',
      description: 'Perfect for a night out',
      price: 34.99,
      quantity: 1,
      orderDate: new Date('2023-06-10'),
      status: 'Shipped',
      productImages: [
        'tshirt8.jpg'
      ],
      userPhotoUrl: 'tshirt8.jpg',
      customer_id: 8,
      design_id: 8,
      order_manager_id: 8,
      total_price: 34.99
    },
    {
      id: 9,
      productName: 'Topshop Women\'s Denim Dress',
      description: 'Stylish and durable',
      price: 44.99,
      quantity: 1,
      orderDate: new Date('2023-06-15'),
      status: 'Delivered',
      productImages: [
        'tshirt9.jpg'
      ],
      userPhotoUrl: 'tshirt9.jpg',
      customer_id: 9,
      design_id: 9,
      order_manager_id: 9,
      total_price: 44.99
    },
    {
      id: 10,
      productName: 'GAP Women\'s Classic Dress',
      description: 'Timeless and versatile',
      price: 54.99,
      quantity: 1,
      orderDate: new Date('2023-06-20'),
      status: 'Shipped',
      productImages: [
        'tshirt10.jpeg'
      ],
      userPhotoUrl: 'tshirt10.jpeg',
      customer_id: 10,
      design_id: 10,
      order_manager_id: 10,
      total_price: 54.99
    },
    {
      id: 11,
      productName: 'Levi\'s Women\'s Jean Dress',
      description: 'Classic and comfortable',
      price: 69.99,
      quantity: 1,
      orderDate: new Date('2023-06-25'),
      status: 'Processing',
      productImages: [
        'tshirt12.jpg'
      ],
      userPhotoUrl: 'tshirt12.jpg',
      customer_id: 11,
      design_id: 11,
      order_manager_id: 11,
      total_price: 69.99
    },
    {
      id: 12,
      productName: 'Abercrombie Women\'s Shift Dress',
      description: 'Casual and trendy',
      price: 32.99,
      quantity: 1,
      orderDate: new Date('2023-06-30'),
      status: 'Shipped',
      productImages: [
        'tshirt12.jpg'
      ],
      userPhotoUrl: 'tshirt12.jpg',
      customer_id: 12,
      design_id: 12,
      order_manager_id: 12,
      total_price: 32.99
    }
  ];
}
