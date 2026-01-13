import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenuBadge,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Box, Users } from 'lucide-react';
import AppLogo from './app-logo';

// main nav items are built per-render so we can include shared props (like low stock counts)
// See `AppSidebar` for usage.


const footerNavItems: NavItem[] = [];

export function AppSidebar() {
    const { lowStockCount, lowStockProducts } = usePage<SharedData>().props;

    const mainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: dashboard(),
            icon: LayoutGrid,
        },
        {
            title: 'Stocks',
            href: '/stocks',
            icon: Box,
            badge: lowStockCount ?? 0,
        },
        {
            title: 'Users',
            href: '/users',
            icon: Users,
        },
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />

                {(lowStockCount ?? 0) > 0 && (
                    <SidebarGroup className="px-2 py-0">
                        <SidebarGroupLabel>Alerts</SidebarGroupLabel>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href="/stocks?filter=low" prefetch>
                                        <Box />
                                        <span>Low stock</span>
                                    </Link>
                                </SidebarMenuButton>
                                <SidebarMenuBadge>{lowStockCount}</SidebarMenuBadge>
                            </SidebarMenuItem>

                            {(lowStockProducts ?? []).slice(0, 5).map((p: any) => (
                                <SidebarMenuItem key={p.id}>
                                    <SidebarMenuButton asChild size="sm">
                                        <Link href={`/stocks/${p.id}/edit`} prefetch>
                                            <span>{p.name}</span>
                                            <span className="ml-auto text-xs text-neutral-400">{p.quantity}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroup>
                )}
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
