import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

/** Khoảng hở tối thiểu giữa dropdown và mép màn hình khi phải kéo vào cho khỏi tràn */
const VIEWPORT_EDGE_MARGIN = 16;

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, onValueChange, ...props }, ref) => {
  const rootRef = React.useRef<React.ElementRef<typeof NavigationMenuPrimitive.Root> | null>(null);
  const viewportRef = React.useRef<HTMLDivElement | null>(null);
  const [openValue, setOpenValue] = React.useState("");
  const [offset, setOffset] = React.useState(0);

  const setRefs = React.useCallback(
    (node: React.ElementRef<typeof NavigationMenuPrimitive.Root> | null) => {
      rootRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref],
  );

  const handleValueChange = React.useCallback(
    (value: string) => {
      setOpenValue(value);
      onValueChange?.(value);
    },
    [onValueChange],
  );

  // Radix neo viewport vào mép trái của Root nên mọi dropdown đều bung ra ở menu
  // đầu tiên. Đo vị trí trigger đang mở rồi đẩy viewport về đúng dưới menu đó.
  React.useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || !openValue) return;

    const update = () => {
      // aria-expanded để chỉ khớp trigger, không dính nhầm element khác trong dropdown
      const trigger = root.querySelector<HTMLElement>('button[data-state="open"][aria-expanded="true"]');
      if (!trigger) return;

      const rootLeft = root.getBoundingClientRect().left;
      let next = trigger.getBoundingClientRect().left - rootLeft;

      // Menu nằm sát phải (vd "Giới thiệu") có thể đẩy dropdown tràn khỏi màn hình
      const width = viewportRef.current?.offsetWidth ?? 0;
      if (width > 0) {
        const maxLeft = window.innerWidth - VIEWPORT_EDGE_MARGIN - width - rootLeft;
        const minLeft = VIEWPORT_EDGE_MARGIN - rootLeft;
        next = Math.max(minLeft, Math.min(next, maxLeft));
      }

      setOffset(next);
    };

    // Chờ Radix set xong --radix-navigation-menu-viewport-width rồi mới đo bề ngang
    const frame = requestAnimationFrame(update);
    update();

    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", update);
    };
  }, [openValue]);

  return (
    <NavigationMenuPrimitive.Root
      ref={setRefs}
      className={cn("relative z-10 flex max-w-max flex-1 items-center justify-center", className)}
      onValueChange={handleValueChange}
      {...props}
    >
      {children}
      <NavigationMenuViewport ref={viewportRef} style={{ left: offset }} />
    </NavigationMenuPrimitive.Root>
  );
});
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn("group flex flex-1 list-none items-center justify-center space-x-1", className)}
    {...props}
  />
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
);

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle(), "group", className)}
    {...props}
  >
    {children}{" "}
    <ChevronDown
      className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuPrimitive.Trigger>
));
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto",
      className,
    )}
    {...props}
  />
));
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

const NavigationMenuLink = NavigationMenuPrimitive.Link;

// ref + style gắn vào div bọc ngoài vì đó mới là phần được canh theo trigger đang mở
const NavigationMenuViewport = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, style, ...props }, ref) => (
  <div ref={ref} style={style} className={cn("absolute top-full flex justify-center")}>
    <NavigationMenuPrimitive.Viewport
      className={cn(
        "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
        className,
      )}
      {...props}
    />
  </div>
));
NavigationMenuViewport.displayName = NavigationMenuPrimitive.Viewport.displayName;

const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
      className,
    )}
    {...props}
  >
    <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
  </NavigationMenuPrimitive.Indicator>
));
NavigationMenuIndicator.displayName = NavigationMenuPrimitive.Indicator.displayName;

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
};
