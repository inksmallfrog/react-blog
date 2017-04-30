---
title: ubuntu下NTFS分区挂载失败解决
date: 2017-02-26 09:04:39
category: 技术
tags: Linux
---
## 问题
最近一段时间用Linux挂载Windows下的NTFS分区的时候，老是报这个错误
![](/image/linux_mount_ntfs_err.png)
而且最讨厌的还是时好时不好的

今天忍受不了了，Google到了一个解决方案
``` shell
sudo ntfsfix <dev-name>
```
直接把报错的分区修复了

<!--more-->

## 原因
顺带查了一下原因，ArchLinux的Wiki上面描述如下：
> 当与Windows 8 或 10双引导时,试图挂载一个可见的Windows可能会出现如下错误: 
> > The disk contains an unclean file system (0, 0).  
> > Metadata kept in Windows cache, refused to mount.
> > Failed to mount '/dev/sdc1': Operation not permitted
> > The NTFS partition is in an unsafe state. Please resume and shutdown
> > Windows fully (no hibernation or fast restarting), or mount the volume
> > read-only with the 'ro' mount option.))

> 问题是因为Windows 8中引入"快速启动"特性。启用快速启动后，所有分区的元数据的一部分被还原到它们在以前关闭的状态。因此，在 Linux 上所做的更改可能会丢失。这会发生在任何选择"关闭"或"休眠" NTFS 分区的Windows 8 或 10 下。然而，通过选择"重新启动"，离开 Windows 是看似安全的。
> 要启用对其他操作系统的系统分区写入，请确保禁用快速重启。要做到这一点通过以管理员身份执行命令: 
``` shell
powercfg /h off
```
