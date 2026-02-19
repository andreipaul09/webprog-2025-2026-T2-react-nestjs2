"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuestbookService = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const dotenv = require("dotenv");
dotenv.config();
let GuestbookService = class GuestbookService {
    constructor() {
        this.supabase = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
    }
    async findAll() {
        const { data, error } = await this.supabase.from('guestbook').select('*').order('created_at', { ascending: false });
        if (error)
            throw error;
        return data;
    }
    async create(dto) {
        const { data, error } = await this.supabase.from('guestbook').insert([dto]).select();
        if (error)
            throw error;
        return data;
    }
    async update(id, dto) {
        const { data, error } = await this.supabase.from('guestbook').update(dto).eq('id', id).select();
        if (error)
            throw error;
        return data;
    }
    async delete(id) {
        const { error } = await this.supabase.from('guestbook').delete().eq('id', id);
        if (error)
            throw error;
        return { success: true };
    }
};
exports.GuestbookService = GuestbookService;
exports.GuestbookService = GuestbookService = __decorate([
    (0, common_1.Injectable)()
], GuestbookService);
//# sourceMappingURL=guestbook.service.js.map