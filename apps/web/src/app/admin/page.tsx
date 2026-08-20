"use client";

import Link from "next/link";
import {
  LayoutDashboard, Package, ShoppingCart, Users, Star,
  Tag, RotateCcw, BarChart3, Settings,
} from "lucide-react";

const stats = [
  { label: "Total Orders", value: "1,234", change: "+12%" },
  { label: "Revenue", value: "₹8,45,000", change: "+18%" },
  { label: "Customers", value: "856", change: "+8%" },
  { label: "Products", value: "48", change: "+3" },
];

const sidebarItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Reviews", href: "/admin/reviews", icon: Star },
  { label: "Coupons", href: "/admin/coupons", icon: Tag },
  { label: "Returns", href: "/admin/returns", icon: RotateCcw },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

const recentOrders = [
  { id: "AAK-001", customer: "Priya S.", total: "₹1,299", status: "Processing" },
  { id: "AAK-002", customer: "Ananya P.", total: "₹899", status: "Shipped" },
  { id: "AAK-003", customer: "Sneha R.", total: "₹2,499", status: "Delivered" },
  { id: "AAK-004", customer: "Kavya M.", total: "₹699", status: "Pending" },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-secondary/30 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-border hidden lg:block">
        <div className="p-6 border-b border-border">
          <span className="font-serif text-xl tracking-[0.15em] text-gradient font-semibold">
            AAKSHI
          </span>
          <p className="text-xs text-muted-foreground mt-1">Admin Panel</p>
        </div>
        <nav className="p-4 space-y-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-primary hover:bg-accent/50 transition-colors"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-8">
        <h1 className="font-serif text-2xl font-medium mb-6">Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-border p-5">
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-semibold mt-1">{stat.value}</p>
              <p className="text-xs text-green-600 mt-1">{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl border border-border">
          <div className="p-5 border-b border-border flex justify-between items-center">
            <h2 className="font-medium">Recent Orders</h2>
            <Link href="/admin/orders" className="text-sm text-primary hover:underline">
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="p-4 font-medium text-muted-foreground">Order</th>
                  <th className="p-4 font-medium text-muted-foreground">Customer</th>
                  <th className="p-4 font-medium text-muted-foreground">Total</th>
                  <th className="p-4 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-border last:border-0">
                    <td className="p-4 font-medium">{order.id}</td>
                    <td className="p-4">{order.customer}</td>
                    <td className="p-4">{order.total}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 rounded-full text-xs bg-accent text-primary">
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
