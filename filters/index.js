import dayjs from "dayjs";
//时间戳格式化为 YYYY/MM/DD
export function dateFormat(date) {
    if (date) {
        date *= 1000
        return dayjs(date).format("YYYY/MM/DD")
    } else {
        return ''
    }
}
//时间戳格式化为 YYYY/MM/DD HH:mm:ss
export function dateTimeFormat(date) {
    if (date) {
        date *= 1000
        return dayjs(date).format("YYYY/MM/DD HH:mm")
    } else {
        return ''
    }
}
//时间戳格式化为 YYYY年MM月DD日 HH:mm:ss
export function TimeFormat(date) {
    if (date) {
        date *= 1000
        return dayjs(date).format("YYYY年MM月DD日 HH:mm:ss")
    } else {
        return ''
    }
}
//时间格式化 HH:mm
export function dateHMSFormat(date) {
    if (date) {
      date *= 1000
      return dayjs(date).format("HH:mm")
    } else {
      return ''
    }
  }
//时间格式化 HH:mm:ss
export function datehmsFormat(date) {
    if (date) {
      date *= 1000
      return dayjs(date).format("HH:mm:ss")
    } else {
      return ''
    }
  }  
//格式化分享路线
export function shareFormat(date) {
    switch (date) {
    	case 0:
    		return "关闭";
    	case 1:
    		return "开启";
    }
}
//格式化路线状态
export function statusFormat(date) {
    switch (date) {
        case 0:
            return "草稿";
        case 1:
            return "已提交";
        case 2:
            return "进行中的路线";
        case 3:
            return "完成的路线";
    }
}
// export function dateTimeFormat(date) {
// 	if (date) {
// 		const TIME = new Date(date * 1000)

// 		function add0(val) {
// 			if (val < 10) {
// 				return `0${val}`
// 			} else {
// 				return val
// 			}
// 		}
// 		let [dd, mm, MM, hh] = [add0(TIME.getDate()),
// 			add0(TIME.getMonth() + 1),
// 			add0(TIME.getMinutes()),
// 			add0(TIME.getHours())
// 		]

// 		return `${mm}/${dd}/${TIME.getFullYear()} ${hh}:${MM}`
// 	} else {
// 		return ''
// 	}
// }
// export function dateFormat(date) {
// 	if (date) {
// 		const TIME = new Date(date * 1000)

// 		function add0(val) {
// 			if (val < 10) {
// 				return `0${val}`
// 			} else {
// 				return val
// 			}
// 		}
// 		let [dd, mm] = [add0(TIME.getDate()),
// 			add0(TIME.getMonth() + 1)
// 		]

// 		return `${mm}/${dd}/${TIME.getFullYear()}`
// 	} else {
// 		return ''
// 	}
// }
