public class zomatoSearch{
       
        public Integer results_shown{get;set;}
		public Integer results_start{get;set;}
		public list<restaurants> restaurants{get;set;}
		public Integer results_found{get;set;}
	public class user_rating{
		public rating_obj rating_obj{get;set;}
		public String rating_color{get;set;}
		public String rating_text{get;set;}
		public Integer votes{get;set;}
		public String aggregate_rating{get;set;}
	}
	public class title{
		public String text{get;set;}
	}
	public class reviews{
		public list<String> review{get;set;}
	}
	// public class restaurants{
	// 	public restaurant restaurant{get;set;}
	// }
	public class restaurants{
		public String book_form_web_view_url{get;set;}
		public list<String> offers{get;set;}
		public Integer opentable_support{get;set;}
		public list<String> highlights{get;set;}
		public Integer is_zomato_book_res{get;set;}
		public String currencyval{get;set;}
		public String mezzo_provider{get;set;}
		public Integer price_range{get;set;}
		public Integer is_book_form_web_view{get;set;}
		public Integer average_cost_for_two{get;set;}
		public String book_again_url{get;set;}
		public String timings{get;set;}
		public String thumb{get;set;}
		public String cuisines{get;set;}
		public String featured_image{get;set;}
		public Integer has_online_delivery{get;set;}
		public String menu_url{get;set;}
		public Integer is_delivering_now{get;set;}
		public Integer photo_count{get;set;}
		public String store_type{get;set;}
		public String photos_url{get;set;}
		public Boolean include_bogo_offers{get;set;}
		public Integer all_reviews_count{get;set;}
		public String deeplink{get;set;}
		public user_rating user_rating{get;set;}
		public Integer is_table_reservation_supported{get;set;}
		public Integer switch_to_order_menu{get;set;}
		public Integer has_table_booking{get;set;}
		public location location{get;set;}
		public String events_url{get;set;}
		public String url{get;set;}
		public String phone_numbers{get;set;}
		public String name{get;set;}
		public all_reviews all_reviews{get;set;}
		public String id{get;set;}
		public list<String> establishment{get;set;}
		public String apikey{get;set;}
		public list<String> valtypes{get;set;}
		public R R{get;set;}
	}
	public class rating_obj{
		public title title{get;set;}
		public bg_color bg_color{get;set;}
	}
	public class R{
		public Boolean is_grocery_store{get;set;}
		public Integer res_id{get;set;}
		public has_menu_status has_menu_status{get;set;}
	}
	public class location{
		public Integer city_id{get;set;}
		public String latitude{get;set;}
		public String longitude{get;set;}
		public String city{get;set;}
		public String zipcode{get;set;}
		public String locality{get;set;}
		public Integer country_id{get;set;}
		public String address{get;set;}
		public String locality_verbose{get;set;}
	}
	public class has_menu_status{
		public Integer takeaway{get;set;}
		public Integer delivery{get;set;}
	}
	public class bg_color{
		public String tint{get;set;}
		public String type{get;set;}
	}
	public class all_reviews{
		public list<reviews> reviews{get;set;}
	}
            public static zomatoSearch parse(String json){
                return (zomatoSearch) System.JSON.deserialize(json, zomatoSearch.class);
            }
}