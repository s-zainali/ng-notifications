import { Body, Controller, Delete, Get, Param, Post, Put, Request } from "@nestjs/common";
import { NotificationsService } from "./notifications.service";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { UpdateNotificationDto } from "./dto/update-notification.dto";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller('notifications')
export class NotificationsController {
    constructor(
        private readonly notificationsService: NotificationsService
    ) {}

    @Get()
    async findAll(@Request() req: any) {
        return this.notificationsService.findAll(req.user.sub)
    }

    @Get(':id')
    async findOne(@Request() req: any, @Param('id') id: string ) {
        return this.notificationsService.findOne(id, req.user.sub)
    }

    @Post()
    async create(@Request() req: any, @Body() createDto: CreateNotificationDto) {
        return this.notificationsService.create(createDto, req.user.sub)
    }

    @Put(':id')
    async update(@Request() req: any, @Param('id') id: string,  @Body() updateDto : UpdateNotificationDto) {
        return this.notificationsService.update(id, updateDto, req.user.sub)
    }

    @Delete(':id')
    async remove(@Request() req: any, @Param('id') id: string) {
        return this.notificationsService.remove(id, req.user.sub)
    }
}